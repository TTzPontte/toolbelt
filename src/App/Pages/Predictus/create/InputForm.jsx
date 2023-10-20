import React, { useState, useCallback } from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card
} from "react-bootstrap";
import Radio from "../../../components/Form/Radio";
import {
  personTypeOptions,
  downloadFromS3,
  initiateFileDownload,
  invokeLambda
} from "../helper";
import DocumentInput from "../../../components/Form/FormInputs/DocumentInput";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const InputForm = () => {
  const methods = useForm();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = methods;
  const type = watch("type");

  const [responseDocNumber, setResponseDocNumber] = useState(null);

  const clearToasts = useCallback(() => toast.dismiss(), []);

  const handleFormSubmit = async (data) => {
    clearToasts();
    try {
      const lambdaResponse = await invokeLambda(data.documentNumber);
      if (lambdaResponse.errorMessage) {
        throw new Error(lambdaResponse.errorMessage);
      }
      const signedUrl = await downloadFromS3(data.documentNumber);
      initiateFileDownload(signedUrl, `${data.documentNumber}.xlsx`);
      setResponseDocNumber(data.documentNumber);
      reset();
      toast.success(`File for Document Number ${data.documentNumber} is downloading...`);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    }
  };

  return (
      <Container className="mt-5">
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">Document Input</Card.Header>
          <Card.Body>
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Radio
                    label="Tipo de Pessoa"
                    name="type"
                    options={personTypeOptions}
                    inline
                    control={control}
                />
                <Row className="mt-3">
                  <Col>
                    {type && (
                        <DocumentInput
                            control={control}
                            documentType={type}
                            error={errors.documentNumber}
                        />
                    )}
                  </Col>
                </Row>
                <div className="mt-4 d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </FormProvider>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default InputForm;
