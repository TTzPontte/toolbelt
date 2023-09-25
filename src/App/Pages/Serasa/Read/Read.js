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
import { getReportById } from "./hepers";

const getItem = async (id) => {
  try {
    const serasaReport = await DataStore.query(SerasaReport, id);

    // Use async/await to await the Promise returned by values.then()
    const partnerReports = await serasaReport?.SerasaPartnerReports.values;

    // Return an object that includes both serasaReport and serasaPartnerReports
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

  const fetchData = async () => {
    try {
      // const fetchedModel = await getReportById(id);
      const fetchedModel = await getItem(id);
      console.log({ fetchedModel }); // Log the data

      setModel(fetchedModel);
      setPartners(fetchedModel.serasaPartnerReports);
      // debugger;
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
      console.log({ reports });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
