import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/Pdf/main";
import Results from "../../../Containers/Searches/Result/Results";
import { getReportById } from "./hepers_gql";
import ReadPartnerReport from "./components/ReadPartnerReport";
import {toast} from "react-toastify";

const getItem = async (id) => {
  try {
    const {
      data: { getSerasaReport: data }
    } = await getReportById(id);
    const { SerasaPartnerReports } = data;
    console.log({ data });
    if (!data) {
      console.error("SerasaReport not found for ID:", id);
      return null; // Return null if not found
    }

    const newObj = {
      ...data,
      serasaPartnerReports: data?.SerasaPartnerReports?.items
    };
    console.log({ newObj });
    return newObj;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const fetchJson = async (id) => {
  const result = await Storage.get(`serasa/${id}.json`, {
    download: true,
    level: "public"
  });

  const blob = result.Body;
  const text = await blob.text();
  const jsonContent = JSON.parse(text);
  return jsonContent;
};

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModel = await getItem(id);
        setModel(fetchedModel);
        setPartners(fetchedModel?.serasaPartnerReports);
        const jsonContent = await fetchJson(id);
        setFileContent(jsonContent);
        setReports(jsonContent.reports);
        toast.success("Successfully Loaded");

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = () => {
    const reportType = model.type === "PF" ? "consumer" : "company";
    const ddData =
      model.type === "PF"
        ? generateDDPF(fileContent)
        : generateDDPJ(fileContent);
    const reportName = fileContent.reports[0].registration[reportType + "Name"];
    createPDF(ddData, reportName);
  };

  return (
    <div>
      {fileContent && (
        <Row>
          <Container>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header> Relatório Serasa</Accordion.Header>
                <Accordion.Body>
                  <Col>
                    <Card>
                      <Card.Body>
                        {reports?.length > 0 && <Results list={reports} />}
                      </Card.Body>
                    </Card>

                  </Col>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {reports.length > 0 && (
                <Card>
                  <Row>
                    <Col>
                      <Button onClick={handleDownloadPDF}>
                        Baixar Relatório PDF
                      </Button>
                    </Col>
                  </Row>
                  <ReadPartnerReport
                      fileContent={fileContent}
                      partners={partners}
                      pfOuPj="PJ"
                  />
                </Card>
            )}
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
