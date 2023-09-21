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
import { ReportStatus,EntityType, SerasaPartnerReport } from "../../../../models";
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
import { DataStore } from "aws-amplify";

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
const createPayload = (data) => {
  return {
    documentNumber: data.documentNumber,
    type: data.type,
    pipefyId: data.pipefyId,
    ambiente: getEnvironment()
  };
};
const formatDocumentNumber = (documentNumber) => {
  return documentNumber.replace(/\D/g, "");
};
const fetchSerasa = async (payload) => {
  const result = await invokeLambda("CreateSerasaReport-staging", payload);
  return JSON.parse(result.Payload);
};

const handleSerasaSuccess = async (
  response,
  reportId,
    pipefyId,
  personType,
  setReports,
  setResponse,
  setPartners
) => {
  if (response.statusCode === 200) {
    await updateReport(reportId, ReportStatus.SUCCESS);
    setResponse(response.response);
    await uploadToStorage(response.response, reportId, "fileName");
    setReports(response.response.reports);
    handlePartners(response, personType, setPartners,  pipefyId,);
  } else {
    throw new Error(`Serasa Error: ${response.errorMessage}`);
  }
};

const handlePartners = async (response, personType, setPartners, reportId,  pipefyId,) => {
  let partnersList = [];

  if (
    personType === "PJ" &&
    response.response.optionalFeatures?.partner?.PartnerResponse?.results
  ) {
    partnersList =
      response.response.optionalFeatures.partner.PartnerResponse.results.filter(
        (partner) => partner.participationPercentage > 0
      );
  } else if (
    personType === "PF" &&
    response.response.optionalFeatures?.partner?.partnershipResponse
  ) {
    partnersList =
      response.response.optionalFeatures.partner.partnershipResponse.filter(
        (partner) => partner.participationPercentage > 0
      );
  }

  // Create a SerasaPartnerReport for each partner
  for (const partner of partnersList) {
    try {
      await DataStore.save(
        new SerasaPartnerReport({
          type: personType,
          documentNumber: partner.documentNumber, // Assuming partner has a documentNumber
          pipefyId: pipefyId, // Assuming partner has a pipefyId
          status: EntityType.PJ, // Update this based on your logic
          // filePath: "path-to-file", // Update this based on your logic
          serasareportID: reportId // SerasaReport: /* Provide a SerasaReport instance here if needed */
        })
      );
    } catch (error) {
      console.error("Error creating SerasaPartnerReport:", error);
    }
  }

  setPartners(partnersList);
};

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");

  const onSubmit = async (data) => {
    data.documentNumber = formatDocumentNumber(data.documentNumber);
    const payload = createPayload(data);

    setLoading(true);

    const reportItem = await createReport(payload);

    try {
      const requestSerasa = await fetchSerasa(payload);
      handleSerasaSuccess(
        requestSerasa,
        reportItem.id,
          reportItem.pipefyId,
        data.personType,
        setReports,
        setResponse,
        setPartners
      );
    } catch (error) {
      await handleSerasaError(reportItem.id, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSerasaError = async (reportId, error) => {
    await updateReport(reportId, ReportStatus.ERROR_SERASA);
    console.error("Error during Serasa request:", error);
    alert(`Error during Serasa request: ${error.message}`);
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
        <ReadReportResults
          {...{ response, partners, reports, handleDownloadPDF }}
        />
      </Row>
    </Container>
  );
};

export default CreateReportPage;
