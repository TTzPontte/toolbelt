import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { SerasaPartnerReport, SerasaReport } from "../../../../models";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/novoGeradorPDF/main";
import ReadPartnerReport from "./ReadPartnerReport";
import Results from "../../../Containers/Searches/Result/Results";

const getItem = async (id) => {
  const getAssociatedPartnerReports = async (serasaReportId) => {
    try {
      // Use the eq method to construct the predicate
      return await DataStore.query(SerasaPartnerReport, (report) =>
        report.serasareportID.eq(serasaReportId)
      );
    } catch (error) {
      console.error("Error fetching associated SerasaPartnerReports:", error);
      throw error;
    }
  };

  try {
    const serasaReport = await DataStore.query(SerasaReport, id);
    if (!serasaReport) {
      console.error("SerasaReport not found for ID:", id);
      return null; // Return null if not found
    }

    const partnerReports = await getAssociatedPartnerReports(id);

    return { ...serasaReport, serasaPartnerReports: partnerReports };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const [fileContent, setFileContent] = useState(null);
  // Fetch the SerasaReport and associated SerasaPartnerReports from DataStore
  const fetchReportData = async () => {
    try {
      const fetchedModel = await getItem(id);
      console.log({ fetchedModel });
      setModel(fetchedModel);
      setPartners(fetchedModel.serasaPartnerReports);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  // Fetch the JSON content from S3
  const fetchJSONData = async () => {
    try {
      const result = await Storage.get(`serasa/${id}.json`, {
        download: true,
        level: "public"
      });
      const blob = result.Body;
      const text = await blob.text();
      const jsonContent = JSON.parse(text);
      setFileContent(jsonContent);
      setReports(jsonContent.reports);
      setResponse(jsonContent);
      console.log({ jsonContent });
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  useEffect(() => {
    fetchReportData(); // Fetch model data

    // Set up the subscription
    const subscription = DataStore.observe(SerasaPartnerReport).subscribe(
      (msg) => {
        if (msg.element.serasareportID === id) {
          fetchReportData(); // Re-fetch the report data if there are updates
        }
      }
    );

    // Cleanup the subscription when the component is unmounted
    return () => subscription.unsubscribe();
  }, [id]);

  useEffect(() => {
    fetchJSONData(); // Fetch JSON data from S3
  }, [id]);

  const handleDownloadPDF = () => {
    const reportType = model.type === "PF" ? "consumer" : "company";
    console.log({ fileContent });
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
                  {model?.SerasaPartnerReports?.map((i) => (
                    <span>{i.type}</span>
                  ))}
                  <br />
                  {reports.length > 0 && (
                    <Button onClick={handleDownloadPDF}>
                      Baixar Relatório PDF
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <Card>
                {partners && reports.length > 0 && (
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
