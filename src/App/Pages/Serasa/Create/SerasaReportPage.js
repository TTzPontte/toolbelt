import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReportForm from "./ReportForm";
import env from "../../../../config/env";
import { invokeLambda } from "./hepers";
const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.documentNumber = data.documentNumber.replace(/\D/g, "");
    const ambiente = getEnvironment();
    const payload = {
      documentNumber: data.documentNumber,
      type: data.type,
      pipefyId: data.pipefyId,
      ambiente: "prod",
      environment: "prod"
    };
    
    setLoading(true);

    try {
      const result = await invokeLambda(
        env.SERASA_REPORT_LAMBDA,
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
