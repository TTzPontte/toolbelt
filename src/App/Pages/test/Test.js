import React, { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Col, Form, FormGroup, Row, Button } from "react-bootstrap";
import Results from "../../Containers/Searches/Result/Results";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../servicer/pdf_helpers/Pdf/main";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { DataStore } from "@aws-amplify/datastore";
import { EntityType, ReportStatus, SerasaReport } from "../../../models";
import * as PropTypes from "prop-types";
import Radio from "../../components/Form/Radio";

const personTypeOptions = [
  { label: "PF", value: "PF" },
  { label: "PJ", value: "PJ" }
];

const getEnvironment = () =>
  window.location.hostname === "localhost" ? "dev" : "prod";

const invokeLambda = async (functionName, payload) => {
  const credentials = await Auth.currentCredentials();
  const lambda = new Lambda({ region: "us-east-1", credentials });

  return lambda
    .invoke({
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    })
    .promise();
};

const createReport = async (payload) => {
  const item = await DataStore.save(
    new SerasaReport({
      documentNumber: payload.numDocument,
      pipefyId: payload.idPipefy,
      type: EntityType.PF,
      status: ReportStatus.PROCESSING
    })
  );
  return item;
};

const updateReport = async (id, status) => {
  const original = await DataStore.query(SerasaReport, id);
  const updatedReport = await DataStore.save(
    SerasaReport.copyOf(original, (updated) => {
      updated.status = status;
    })
  );
  return updatedReport;
};

const ReportForm = () => {
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;

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
              <Form.Label>Número do Documento</Form.Label>
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
          </Col>
          <Col sm={5}>
            <FormGroup controlId="idPipefy">
              <Form.Label></Form.Label>
              <Controller
                name="idPipefy"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="hidden"
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
        <br />
        {loading && <h2>Carregando...</h2>}
        {reports.length > 0 && <Results list={reports} />}
        <br />
        {reports.length > 0 && (
          <Button onClick={handleDownloadPDF}>Baixar Relatório PDF</Button>
        )}
        <br />
        <br />
        {partners.length > 0 && <Results list={partners} pfOuPj="PJ" />}
      </Form>
    </FormProvider>
  );
};

export default ReportForm;
