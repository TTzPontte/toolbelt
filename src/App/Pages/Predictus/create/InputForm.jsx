import React, { useState, useCallback } from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { Button, Container, Form, Row, Col, Card, Spinner } from "react-bootstrap";  // Import Spinner
import Radio from "../../../components/Form/Radio";
import DocumentInput from "../../../components/Form/FormInputs/DocumentInput";
import { toast } from "react-toastify";
import { PredictusReport, ReportStatus } from "../../../../models";
import { DataStore } from "@aws-amplify/datastore";
import {
  personTypeOptions,
  downloadFromS3,
  initiateFileDownload,
  invokeLambda
} from "../helper";

// Function to save the report
const saveReport = async (documentNumber) => {
  return await DataStore.save(
      new PredictusReport({
        documentNumber,
        status: ReportStatus.PROCESSING
      })
  );
};

// Function to handle form submission logic
const handleFormSubmission = async (data, reset, setResponseDocNumber, setLoading) => {
  try {
    setLoading(true);  // Start loading
    const report = await saveReport(data.documentNumber);
    const lambdaResponse = await invokeLambda(report.id);

    if (lambdaResponse.errorMessage || lambdaResponse.statusCode !== 200) {
      throw new Error(lambdaResponse.errorMessage);
    }

    const signedUrl = await downloadFromS3(report.id);
    initiateFileDownload(signedUrl, `${report.id}.xlsx`);

    setResponseDocNumber(data.documentNumber);
    reset();
    toast.success(`File for Document Number ${data.documentNumber} is downloading...`);
  } catch (err) {
    console.error("Error:", err);
    toast.error(err.message || "An unexpected error occurred.");
  } finally {
    setLoading(false);  // End loading
  }
};

const InputForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const type = watch("type");
  const [loading, setLoading] = useState(false);  // Loading state
  const [responseDocNumber, setResponseDocNumber] = useState(null);
  const clearToasts = useCallback(() => toast.dismiss(), []);

  // Render the form component
  return (
      <Container className="mt-5">
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            Document Input
          </Card.Header>
          <Card.Body>
            <FormProvider {...{ control, handleSubmit, watch, reset, errors }}>
              <Form
                  onSubmit={handleSubmit((data) => {
                    clearToasts();
                    handleFormSubmission(data, reset, setResponseDocNumber, setLoading);
                  })}
              >
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
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
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
