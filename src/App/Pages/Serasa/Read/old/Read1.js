import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { SerasaPartnerReport, SerasaReport } from "../../../../../models";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../../servicer/pdf_helpers/main";
import ReadPartnerReport from "../components/ReadPartnerReport";
import Results from "../../../../Containers/Searches/Result/Results";
const LoadingSpinner = ()=>(<h1>...Loading</h1>)
const ErrorMessage = (error)=>(<h1>...error{JSON.stringify(error)}</h1>)
const ReadReport = ({reports}) => {
  return(<>
  {reports.length > 0 && <Results list={reports} />}
      </>
  )

}
const handleDownloadPDF = ({ fileContent, model }) => {
  if (!fileContent || !model) return;

  const reportType = model.type === "PF" ? "consumer" : "company";
  const ddData =
    model.type === "PF" ? generateDDPF(fileContent) : generateDDPJ(fileContent);
  const reportName = fileContent.reports[0]?.registration[reportType + "Name"];
  createPDF(ddData, reportName);
};

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Serasa Report and associated data
  const fetchSerasaReportData = async () => {
    try {
      const serasaReport = await DataStore.query(SerasaReport, id);
      const partnerReports = await serasaReport?.SerasaPartnerReports.values;

      setModel(serasaReport);
      setPartners(partnerReports);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // Fetch JSON content from S3
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
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSerasaReportData();
    fetchJSONData();
  }, [id]);


  return (
      <div>
        <h1>Serasa Report</h1>
        {isLoading ? (
            <LoadingSpinner />
        ) : error ? (
            <ErrorMessage message="An error occurred while fetching the data." />
        ) : (
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
        )}
        {fileContent && (
            <Row>
              <Container>
                <h1>Create Serasa Report</h1>
                <Col>
                  <Card>
                    <Card.Body>
                    <ReadReport reports={reports}/>
                      {model?.serasaPartnerReports?.map((i) => (
                          <span key={i.id}>{i.type}</span>
                      ))}
                      <br />
                      {reports.length > 0 && (
                          <Button onClick={()=>handleDownloadPDF({ fileContent, model })}>
                            Download PDF Report
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
