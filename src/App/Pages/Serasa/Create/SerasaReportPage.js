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
          name="personType"
          options={personTypeOptions}
          inline
          control={control}
        />
        <Row>
          <Col sm={4}>
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
            <FormGroup controlId="idPipefy">
              <Form.Label>Pipefy Card Id:</Form.Label>
              <Controller
                name="idPipefy"
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
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");

  const onSubmit = async (data) => {
    data.documentNumber = data.documentNumber.replace(/\D/g, "");
    const ambiente = getEnvironment();
    const payload = {
      numDocument: data.documentNumber,
      tipoPessoa: data.personType,
      idPipefy: data.idPipefy,
      ambiente
    };

    setLoading(true);

    const reportItem = await createReport(payload);
    const reportId = reportItem.id;
    console.log({reportId})

    try {
      // const result = await invokeLambda("ApiSerasa-serasa", payload);
      const result = await invokeLambda("CreateSerasaReport-staging", payload);
      const requestSerasa = JSON.parse(result.Payload);
      const statusRequest = requestSerasa.statusCode;

      if (statusRequest === 200) {
        const updateItem = await updateReport(
          reportItem.id,
          ReportStatus.SUCCESS
        );
        const response = JSON.parse(result.Payload);
        setResponse(response.response);
        await uploadToStorage(response,reportId, "fileName");
        setReports(response.response.reports);

        if (data.personType === "PJ") {
          if (
            response.response.optionalFeatures?.partner?.PartnerResponse
              ?.results !== undefined
          ) {
            const filteredPartners =
              response.response.optionalFeatures.partner.PartnerResponse.results.filter(
                (partner) => partner.participationPercentage > 0
              );
            setPartners(filteredPartners);
          } else {
            await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
          }
        } else if (data.personType === "PF") {
          if (
            response.response.optionalFeatures?.partner?.partnershipResponse !==
            undefined
          ) {
            const filteredPartners =
              response.response.optionalFeatures.partner.partnershipResponse.filter(
                (partner) => partner.participationPercentage > 0
              );
            setPartners(filteredPartners);
          } else {
            await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
          }
        }
      } else {
        console.log({ requestSerasa });
        alert(
          "Ocorreu um erro ao consultar o Serasa: \n" +
            result.Payload.errorMessage +
            "\nCódigo do erro: " +
            String(statusRequest)
        );
        await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
      }
      setPersonType(data.personType);
    } catch (error) {
      await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
      console.log("Ocorreu um erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (personType === "PF") {
      const ddPF = generateDDPF(response);
      var nomeJsonPF = response.reports[0].registration.consumerName;
      createPDF(ddPF, nomeJsonPF);
    } else {
      const ddPJ = generateDDPJ(response);
      var nomeJsonPJ = response.reports[0].registration.companyName;
      createPDF(ddPJ, nomeJsonPJ);
    }
  };

  return (
    <Container>
      <h1>Create Serasa Report</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <ReportForm onSubmit={onSubmit}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <br />
        {loading && <h2>Carregando...</h2>}
        <ReadReportResults {...{ partners, reports, handleDownloadPDF }} />
      </Row>
    </Container>
  );
};

export default CreateReportPage;
