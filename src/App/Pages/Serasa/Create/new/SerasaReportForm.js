import React, { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import {
    Col,
    Form,
    FormGroup,
    Row,
    Button,
    Container,
    Card
} from "react-bootstrap";
import Radio from "../../../../components/Form/Radio";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { DataStore } from "@aws-amplify/datastore";
import { EntityType, ReportStatus, SerasaReport } from "../../../../../models";

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

const CreateReportForm = ({ onSubmitSuccess }) => {
    const methods = useForm();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = methods;

    const [loading, setLoading] = useState(false);

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

        try {
            const reportItem = await createReport(payload);
            const result = await invokeLambda("CreateSerasaReport-staging", payload);
            const requestSerasa = JSON.parse(result.Payload);
            const statusRequest = requestSerasa.statusCode;

            if (statusRequest === 200) {
                await onSubmitSuccess(reportItem.id, data.personType);
            } else {
                console.log({ requestSerasa });
                alert(
                    "Ocorreu um erro ao consultar o Serasa: \n" +
                    result.Payload.errorMessage +
                    "\nCódigo do erro: " +
                    String(statusRequest)
                );
            }
        } catch (error) {
            console.error("Ocorreu um erro na requisição:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <h1>Create Serasa Report</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
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
                                    <br />
                                    {loading && <h2>Carregando...</h2>}
                                </Form>
                            </FormProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateReportForm;
