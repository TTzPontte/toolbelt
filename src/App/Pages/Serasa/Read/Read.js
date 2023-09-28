import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/Pdf/main";
import Results from "../../../Containers/Searches/Result/Results";
import { invokeLambda } from "./hepers";
import { getReportById } from "./hepers_gql";
import useToast from "./useToast";
import ReadPartnerReport from "./components/Partner";

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
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModel = await getItem(id);
        setModel(fetchedModel);
        setPartners(fetchedModel?.serasaPartnerReports);
        const jsonContent = await fetchJson(id);
        setFileContent(jsonContent);
        setReports(jsonContent.reports);
        showToast("Successfully Loaded")
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Error fetching data:")
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
      <h1>Serasa Report</h1>
      <Row>
        <Col md={3}>
          {model && (
            <Table responsive className="table">
              <thead>
                <tr>
                  <th scope="col">Document Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{model.documentNumber}</td>
                  <td>{model.type}</td>
                  <td>{model.status}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      {fileContent && (
        <Row>
          <Container>
            <h1>Create Serasa Report</h1>
            <Col>
              <Card>
                <Card.Body>
                  {reports?.length > 0 && <Results list={reports} />}
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
