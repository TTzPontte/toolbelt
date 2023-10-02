import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Results from "../../../Containers/Searches/Result/Results";
import { toast } from "react-toastify";
import { fetchJson, fetchReport, getItem, invokeLambda } from "./hepers"; // Fixed the typo
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/main";
import { SerasaPartnerReport } from "../../../../models";
import { DataStore } from "@aws-amplify/datastore";
import ReadPartnerReport from "./components/Partner"; // Assuming you're using AWS Amplify

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
  }, [id]);

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
      <h1>Serasa Report</h1>
      {fileContent && (
        <Row>
          <Container>
            <h1>Create Serasa Report</h1>
            <Col>
              <Card>
                <Card.Body>
                  {reports.length > 0 && <Results list={reports} />}
                  {reports.length > 0 && (
                    <Button onClick={handleDownloadPDF}>
                      Baixar Relatório PDF
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <Card>
                {reports.length > 0 && (
                  <ReadPartnerReport
                    fileContent={fileContent}
                    partners={partners}
                    pfOuPj="PJ"
                  />
                )}
              </Card>
            </Col>
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
