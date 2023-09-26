import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/novoGeradorPDF/main";
import ReadPartnerReport from "./ReadPartnerReport";
import Results from "../../../Containers/Searches/Result/Results";

const LoadingSpinner = () => <h1>...Loading</h1>;
const ErrorMessage = ({ error }) => <h1>...error{JSON.stringify(error)}</h1>;

const Read = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    model: null,
    fileContent: null,
    reports: [],
    partners: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serasaReport = await DataStore.query(SerasaReport, id);
        const partnerReports = await serasaReport?.SerasaPartnerReports.values;

        const result = await Storage.get(`serasa/${id}.json`, {
          download: true,
          level: "public",
        });
        const blob = result.Body;
        const text = await blob.text();
        const jsonContent = JSON.parse(text);

        setData({
          model: serasaReport,
          fileContent: jsonContent,
          reports: jsonContent.reports,
          partners: partnerReports,
          isLoading: false, // Mark loading as complete after fetching all data
          error: null,
        });
      } catch (error) {
        setData({
          isLoading: false, // Mark loading as complete even in case of an error
          error: error,
        });
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = () => {
    if (!data.fileContent || !data.model) return;

    const reportType = data.model.type === "PF" ? "consumer" : "company";
    const ddData =
        data.model.type === "PF" ? generateDDPF(data.fileContent) : generateDDPJ(data.fileContent);
    const reportName = data.fileContent.reports[0]?.registration[reportType + "Name"];
    createPDF(ddData, reportName);
  };

  return (
      <div>
        <h1>Serasa Report</h1>
        {data.isLoading ? (
            <LoadingSpinner />
        ) : data.error ? (
            <ErrorMessage error={data.error} />
        ) : (
            <Row>
              <Col md={3}>
                {data.model && (
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
                        <td>{data.model.documentNumber}</td>
                        <td>{data.model.type}</td>
                        <td>{data.model.status}</td>
                      </tr>
                      </tbody>
                    </Table>
                )}
              </Col>
            </Row>
        )}
        {data.fileContent && (
            <Row>
              <Container>
                <h1>Create Serasa Report</h1>
                <Col>
                  <Card>
                    <Card.Body>
                      {data.reports.length > 0 && <Results list={data.reports} />}
                      {data.model?.serasaPartnerReports?.map((i) => (
                          <span key={i.id}>{i.type}</span>
                      ))}
                      <br />
                      {data.reports.length > 0 && (
                          <Button onClick={handleDownloadPDF}>Download PDF Report</Button>
                      )}
                    </Card.Body>
                  </Card>
                  <Card>
                    {data.partners && data.reports.length > 0 && (
                        <ReadPartnerReport
                            fileContent={data.fileContent}
                            partners={data.partners}
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
