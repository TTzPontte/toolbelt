import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row
} from "react-bootstrap";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/novoGeradorPDF/main";
import { ReportStatus } from "../../../../models";
import Radio from "../../../components/Form/Radio";
import ReadReportResults from "./new/ReadReportResults";
import {
  createReport,
  getEnvironment,
  invokeLambda,
  personTypeOptions,
  updateReport,
  uploadToStorage
} from "./hepers";
import { useNavigate, useNavigation } from "react-router-dom";

const ReportForm = ({ onSubmit }) => {
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;
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
          {/*<Col sm={4}>*/}
          <Col>
            <FormGroup controlId="documentNumber">
              <Form.Label>Número do Documento:</Form.Label>
              <Controller
                name="documentNumber"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Document number"
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
              {errors.documentNumber && (
                <span>{errors.documentNumber.message}</span>
              )}
            </FormGroup>
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
          </Col>
        </Row>
        <br />
        <Button type="submit" color="primary">
          Realizar Consulta
        </Button>
      </Form>
    </FormProvider>
  );
};
const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.documentNumber = data.documentNumber.replace(/\D/g, "");
    const ambiente = getEnvironment();
    const payload = {
      documentNumber: data.documentNumber,
      type: data.type,
      pipefyId: data.pipefyId,
      ambiente: 'prod',
      environment:'prod'
    };

    setLoading(true);

    try {
      const result = await invokeLambda(
        "toolbelt3-CreateToolbeltReport-mKsSY1JGNPES",
        payload
      );
      debugger;
      const { reportId } = JSON.parse(result.Payload);
      setLoading(false);
      navigate('/serasa/' + reportId, { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Consulta Serasa</h1>
      <Row className={"d-flex justify-content-center"}>
        <Col sm={6}>
          <Card>
            <Card.Body>
              <ReportForm onSubmit={onSubmit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <br />
        {loading && <h2>Carregando...</h2>}
      </Row>
    </Container>
  );
};

export default CreateReportPage;
