import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Results from "../../../Containers/Searches/Result/Results";
import { toast } from "react-toastify";
import { fetchJson, getItem } from "./helpers"; // Fixed the typo
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/main";
import ReadPartnerReport from "./components/ReadPartnerReport"; // Assuming you're using AWS Amplify

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
        setPartners(fetchedModel?.serasaPartnerReports || []);
        const jsonContent = await fetchJson(id);
        setFileContent(jsonContent);
        setReports(jsonContent.reports || []);
        toast.success("Successfully Loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const reportType = model?.type === "PF" ? "consumer" : "company";
    const ddData =
      model?.type === "PF"
        ? generateDDPF(fileContent)
        : generateDDPJ(fileContent);
    const reportName =
      fileContent?.reports[0]?.registration[reportType + "Name"];
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
                        {reports.length > 0 && <Results list={reports} />}
                      </Card.Body>
                    </Card>
                  </Col>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Card>
              <Row>
                <Col>
                  {reports.length > 0 && (
                    <Button onClick={handleDownloadPDF}>
                      Baixar Relatório PDF
                    </Button>
                  )}
                </Col>
              </Row>
              {reports.length > 0 && (
                <ReadPartnerReport
                  fileContent={fileContent}
                  partners={partners}
                  pfOuPj="PJ"
                />
              )}
            </Card>
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
