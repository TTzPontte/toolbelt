import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Card,
  Spinner
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Auth, Storage } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import {
  createReport,
  getEnvironment,
  updateReport
} from "../../test/reportService";
import { ReportStatus } from "../../../../models";
import Radio from "../../../components/Form/Radio";
const reportStatusOptions = [
  "PROCESSING",
  "SUCCESS",
  "ERROR_SERASA",
  "ERROR_PIPEFY",
];


const invokeLambda = async (functionName, payload, credentials) => {
  const lambda = new Lambda({ region: "us-east-1", credentials });
  return lambda
    .invoke({
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    })
    .promise();
};

const uploadToStorage = async (data, reportId, fileName) => {
  const filePath = `serasa/${fileName}_${reportId}.json`;
  await Storage.put(filePath, JSON.stringify(data), {
    level: 'protected'  // specify the access level here
  });
};


const handleLambdaResponse = async (response, reportItem, personType) => {
  const parsedResponse = JSON.parse(response.Payload);
  let fileName;

  if (parsedResponse.statusCode === 200) {
    await updateReport(reportItem.id, ReportStatus.SUCCESS);

    if (personType === "PF") {
      fileName = parsedResponse.response.reports[0].registration.consumerName;
    } else {
      fileName = parsedResponse.response.reports[0].registration.companyName;
    }

    await uploadToStorage(parsedResponse, reportItem.id, fileName);
    return parsedResponse;
  } else {
    await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
    alert(`Error: ${parsedResponse.errorMessage}`);
    return null;
  }
};



const SerasaReportForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, register } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const sanitizedDocumentNumber = data.documentNumber.replace(/\D/g, '');
    const environment = getEnvironment();
    const payload = {
      numDocument: sanitizedDocumentNumber,
      tipoPessoa: data?.personType || 'PF',
      idPipefy: data.idPipefy,
      ambiente: environment,
    };

    const reportItem = await createReport(payload);
    const credentials = await Auth.currentCredentials();

    try {
      const lambdaResponse = await invokeLambda('CreateSerasaReport-staging', payload, credentials);
      await handleLambdaResponse(lambdaResponse, reportItem, data.personType);
    } catch (error) {
      await updateReport(reportItem.id, ReportStatus.ERROR_SERASA);
      console.error('Error in request:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const personTypeOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" },
  ];
  return (
    <Container>
      <h1>Create Serasa Report</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Radio
                    label="Tipo de Pessoa"
                    name="personType"
                    options={personTypeOptions}
                    inline
                    control={control}
                />
                <Form.Group>
                  <Form.Label>Document Number</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("documentNumber", { required: true })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pipefy ID</Form.Label>
                  <Form.Control type="text" {...register("idPipefy")} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Report Status</Form.Label>
                  <Form.Control
                      as="select"
                      {...register("status", { required: true })}
                  >
                    {reportStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>


            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SerasaReportForm;
