import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchReport, invokeLambda, fetchJson, getItem } from "./helpers";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../service/pdf_helpers/main";
import { SerasaPartnerReport } from "../../../../models";
import { DataStore } from "@aws-amplify/datastore";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  return [loading, startLoading, stopLoading];
};

const fetchReportForPartner = async (partner, stopLoading) => {
  try {
    await invokeLambda("toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi", partner);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    stopLoading();
  }
};

const mergePartner = (partner, partnerList) => {
  const documentKey = partner.documentNumber.length > 11 ? "businessDocument" : "documentId";
  const matchedPartner = partnerList.find(p => p[documentKey] === partner.documentNumber);

  return matchedPartner ? { ...partner, participationPercentage: matchedPartner.participationPercentage } : partner;
};

const Partner = ({ partner, partnerList }) => {
  const [mergedPartner, setMergedPartner] = useState(partner);
  const [loading, startLoading, stopLoading] = useLoading();

  const handleViewReport = async () => {
    startLoading();
    try {
      const jsonContent = await fetchReport(partner.id);
      const reportType = partner.type === "PF" ? "consumer" : "company";
      const ddData = reportType === "consumer" ? generateDDPF(jsonContent) : generateDDPJ(jsonContent);
      createPDF(ddData, jsonContent.reports[0].registration[`${reportType}Name`]);
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    setMergedPartner(mergePartner(partner, partnerList));
  }, [partner, partnerList]);

  const buttonLabel = loading ? "Loading..." : mergedPartner?.filePath ? "View Report" : "Create Report";

  const handleClick = () => {
    if (partner.filePath) {
      handleViewReport();
    } else {
      startLoading();
      fetchReportForPartner(partner, stopLoading);
    }
  };

  return (
      <tr>
        <td>{mergedPartner.id}</td>
        <td>{mergedPartner.documentNumber}</td>
        <td>{mergedPartner.participationPercentage}</td>
        <td>{mergedPartner.status || "-"}</td>
        <td>
          <Button className="btn-sm" onClick={handleClick} variant="primary" disabled={loading}>
            {buttonLabel}
          </Button>
        </td>
      </tr>
  );
};

const PartnerTableRow = ({ partner, partnerList }) => {
  const [fetchedPartner, setFetchedPartner] = useState(partner);
  const [loading, startLoading, stopLoading] = useLoading();

  useEffect(() => {
    const subscription = DataStore.observe(SerasaPartnerReport, partner.id).subscribe((msg) => {
      setFetchedPartner(msg.element);
    });

    return () => subscription.unsubscribe();
  }, [partner]);

  return <Partner partner={fetchedPartner} partnerList={partnerList} />;
};

const ReadPartnerReport = ({ partners, fileContent }) => {
  const partnerList = [...fileContent.optionalFeatures.partner.PartnerResponse.results, ...partnershipResponse];

  return (
      <Container>
        <Card>
          <Card.Header>
            <h2>Partner Report</h2>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
              <tr>
                <th>ID</th>
                <th>CNPJ</th>
                <th>% Participação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {partners.map((partner) => (
                  <PartnerTableRow key={partner.id} partner={partner} partnerList={partnerList} />
              ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
  );
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
    const ddData = model?.type === "PF" ? generateDDPF(fileContent) : generateDDPJ(fileContent);
    const reportName = fileContent?.reports[0]?.registration[reportType + "Name"];
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
                          <Button onClick={handleDownloadPDF}>Baixar Relatório PDF</Button>
                      )}
                    </Card.Body>
                  </Card>
                  <Card>
                    {reports.length > 0 && (
                        <ReadPartnerReport fileContent={fileContent} partners={partners} pfOuPj="PJ" />
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
