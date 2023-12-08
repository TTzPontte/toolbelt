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
import Radio from "../../../components/Form/Radio";
import { getEnvironment, invokeLambda, personTypeOptions } from "./hepers";
import { useNavigate } from "react-router-dom";
import ReportForm from "./ReportForm";

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.documentNumber = data.documentNumber.replace(/\D/g, "");
    const payload = {
      documentNumber: data.documentNumber,
      type: data.type,
      pipefyId: data.pipefyId,
      ambiente: process.env.REACT_APP_STAGE,
      environment: process.env.REACT_APP_STAGE
    };

    setLoading(true);

    try {
      const result = await invokeLambda(
        "toolbelt3-CreateToolbeltReport-mKsSY1JGNPES",
        payload
      );
      const { reportId } = JSON.parse(result.Payload);
      setLoading(false);
      navigate("/serasa/" + reportId, { replace: true });
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
