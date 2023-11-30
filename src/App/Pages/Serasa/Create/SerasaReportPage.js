import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import { getEnvironment, invokeLambda } from "./hepers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CONFIG } from "../../../../App/config/config";
import ReportForm from "./ReportForm";

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.documentNumber = data.documentNumber.replace(/\D/g, "");
    const payload = {
      documentNumber: data.documentNumber,
      type: data.type,
      pipefyId: data.pipefyId,
      ambiente: CONFIG.ENVIROMENT,
      environment: CONFIG.ENVIROMENT
    };

    console.log(CONFIG.ENVIROMENT)

    setLoading(true);

    try {
      const result = await invokeLambda(
        "toolbelt3-CreateToolbeltReport-mKsSY1JGNPES",
        payload
      );
      
      const parsedResultData = JSON.parse(result.Payload)

      if(parsedResultData.statusCode === 500){
        if(parsedResultData.error.includes("Internal Server Error")){
          throw new Error("Cliente não existente no Serasa")
        }
        throw new Error(parsedResultData.message)
      }
      if(parsedResultData.errorMessage)
      throw new Error(parsedResultData.errorMessage)

        const {
          reportId,
          response: {
            reports: [
              {
                score: { message, codeMessage },
              },
            ],
          },
        } = parsedResultData;
        
        if(message && codeMessage !== 43){
          toast.error(message);
          setLoading(false);
        }

        if(codeMessage === 43)
          toast.warn(message)

        navigate("/serasa/" + reportId, { replace: true });
      
    } catch (error) {
      toast.error(error.message);
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
