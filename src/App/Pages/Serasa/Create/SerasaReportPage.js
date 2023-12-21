import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReportForm from "./ReportForm";
import { invokeLambda } from "./hepers";
import { getEnvConfig } from "../../../../config/config";

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
  const config = await getEnvConfig()

  data.documentNumber = data.documentNumber.replace(/\D/g, "");
    // const ambiente = getEnvironment();
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
        config.SerasaReport,
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
