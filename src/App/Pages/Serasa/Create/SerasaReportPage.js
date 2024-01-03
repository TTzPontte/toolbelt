import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReportForm from "./ReportForm";
import { invokeLambda } from "./hepers";
import { getEnvConfig } from "../../../../config/config";
import { toast } from "react-toastify";
import "./style.scss";

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const config = await getEnvConfig();

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
      const result = await invokeLambda(config.SerasaReport, payload);
      const parsedResultData = JSON.parse(result.Payload);

      if (parsedResultData.statusCode === 500) {
        if (parsedResultData.error.includes("Internal Server Error")) {
          toast.error("Cliente não existente no Serasa");
        }
        toast.error(parsedResultData.message);
      }
      if (parsedResultData.errorMessage)
        toast.error(parsedResultData.errorMessage);

      const {
        reportId,
        response: {
          reports: [
            {
              score: { message, codeMessage }
            }
          ]
        }
      } = parsedResultData;

      if (message && codeMessage !== 43) {
        toast.error(message);
        setLoading(false);
      }

      if (codeMessage === 43) toast.warn(message);

      navigate("/serasa/" + reportId, { replace: true });

      setLoading(false);
      navigate("/serasa/" + reportId, { replace: true });
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <Container className="container-serasa">
      <Row className={"d-flex justify-content-center"}>
      <div className="header-consulta">
        <h1>Consulta Serasa</h1>
      </div>
        <Col sm={7} >
          <Card className="card-style">
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
