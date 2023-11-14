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
import { toast } from "react-toastify";
import ReportForm from "./ReportForm";

const CreateReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
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

        const {
          reportId,
          response: {
            reports: [
              {
                score: { message },
              },
            ],
          },
        } = parsedResultData;
        
        if(message){
          toast.error(message);
          setLoading(false);
          return
        }
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
