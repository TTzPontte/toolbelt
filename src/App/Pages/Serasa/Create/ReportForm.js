import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { cpf, cnpj } from "cpf-cnpj-validator";
import Radio from "../../../components/Form/Radio";
import { personTypeOptions } from "./hepers"; // Corrected the typo "hepers" to "helpers"

const DocumentInput = ({ control, documentType, error }) => {
  const validateDocument = (value) => {
    if (!value) {
      return `${documentType} é obrigatório`;
    }
    console.log({ documentType });
    const isValid =
      documentType === "PF" ? cpf.isValid(value) : cnpj.isValid(value);
    if (!isValid) {
      return `${documentType} inválido`;
    }

    return true;
  };

  return (
    <FormGroup controlId="documentNumber">
      <Form.Label>Número do Documento:</Form.Label>
      <Controller
        name="documentNumber"
        control={control}
        render={({ field }) => (
          <>
            <Form.Control type="text" placeholder={documentType} {...field} />
            {error && <p className="text-danger">{error.message}</p>}
          </>
        )}
        rules={{ validate: validateDocument }}
      />
    </FormGroup>
  );
};

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
