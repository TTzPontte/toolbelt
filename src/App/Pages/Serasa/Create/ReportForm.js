import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import Radio from "../../../components/Form/Radio";
import { personTypeOptions } from "./hepers";
import DocumentInput from "../../../components/Form/FormInputs/DocumentInput"; // Corrected the typo "hepers" to "helpers"

const ReportForm = ({ onSubmit }) => {
  const methods = useForm();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = methods;

  const type = watch("type");

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Radio
          label="Tipo de Pessoa"
          name="type"
          options={personTypeOptions}
          inline
          control={control}
        />
        <Row>
          <Col>
            {type && (
              <>
                <DocumentInput
                  control={control}
                  documentType={type}
                  error={errors.documentNumber}
                />

                <FormGroup controlId="pipefyId">
                  <Form.Label>Pipefy Card Id:</Form.Label>
                  <Controller
                    name="pipefyId"
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder="Id Pipefy"
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </>
            )}
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Realizar Consulta
        </Button>
      </Form>
    </FormProvider>
  );
};

export default ReportForm;
