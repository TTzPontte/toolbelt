import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/novoGeradorPDF/main";
import ReadPartnerReport from "./ReadPartnerReport";
import Results from "../../../Containers/Searches/Result/Results";

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const [fileContent, setFileContent] = useState(null);

  const handlePartners = (fileContent, personType) => {
    const partnerData = fileContent?.response?.optionalFeatures?.partner;
    const partners =
      personType === "PJ"
        ? partnerData?.PartnerResponse?.results
        : partnerData?.partnershipResponse;
    if (partners) {
      const filteredPartners = partners.filter(
        (partner) => partner.participationPercentage > 0
      );
      setPartners(filteredPartners);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedModel = await DataStore.query(SerasaReport, id);
      setModel(fetchedModel);

      const result = await Storage.get(`serasa/${id}.json`, {
        download: true,
        level: "public"
      });
      const blob = result.Body;
      const text = await blob.text();
      const jsonContent = JSON.parse(text);
      setFileContent(jsonContent);
      setReports(jsonContent.response.reports);
      setResponse(jsonContent.response);

      handlePartners(jsonContent, fetchedModel.type);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const reportType = model.type === "PF" ? "individual" : "company";
    const ddData =
      model.type === "PF" ? generateDDPF(response) : generateDDPJ(response);
    const reportName = response.reports[0].registration[reportType + "Name"];
    createPDF(ddData, reportName);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  {reports.length > 0 && <Results list={reports} />}
                  <br />
                  {reports.length > 0 && (
                    <Button onClick={handleDownloadPDF}>
                      Baixar Relatório PDF
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <Card>
                {reports.length > 0 && (
                  <ReadPartnerReport id={id} partners={partners} pfOuPj="PJ" />
                )}
              </Card>
            </Col>
          </Container>{" "}
        </Row>
      )}
    </div>
  );
};

export default Read;
