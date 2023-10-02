import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { fetchReport, invokeLambda } from "../hepers"; // Fixed the typo
import { createPDF, generateDDPF, generateDDPJ } from "../../../../servicer/pdf_helpers/main";
import { SerasaPartnerReport } from "../../../../../models";
import { DataStore } from "@aws-amplify/datastore"; // Assuming you're using AWS Amplify

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
  const matchedPartner = partnerList.find((p) => p[documentKey] === partner.documentNumber);

  return matchedPartner
      ? { ...partner, participationPercentage: matchedPartner.participationPercentage }
      : partner;
};

const Partner = ({ partner, partnerList }) => {
  const [loading, startLoading, stopLoading] = useLoading();
  const [mergedPartner, setMergedPartner] = useState(partner);
  console.log({loading})
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

  const buttonLabel = loading ? "Loading..." : (mergedPartner?.filePath ? "View Report" : "Create Report");

  const handleClick = partner.filePath ? handleViewReport : () => fetchReportForPartner(partner, stopLoading);

  return (
      <tr>
        <td>{mergedPartner.id}</td>
        <td>{mergedPartner.documentNumber}</td>
        <td>{mergedPartner.participationPercentage}</td>
        <td>{mergedPartner.status || "-"}</td>
        <td>{mergedPartner.filePath || "-"}</td>
        <td>
          <Button className="btn-sm" onClick={handleClick} variant="primary" disabled={loading}>
            {buttonLabel}
          </Button>
        </td>
      </tr>
  );
};

const PartnerTableRow = ({ partner, partnerList }) => {
  const [loading, startLoading, stopLoading] = useLoading();
  const [fetchedPartner, setFetchedPartner] = useState(partner);

  useEffect(() => {
    const fetchPartnerData = async () => {
      const partnerFromDataStore = await DataStore.query(SerasaPartnerReport, partner.id);
      setFetchedPartner(partnerFromDataStore);
    };
    fetchPartnerData();
  }, [partner]);

  return <Partner partner={fetchedPartner} partnerList={partnerList} />;
};

const ReadPartnerReport = ({ partners, fileContent }) => {
  const { optionalFeatures: { partner: { PartnerResponse = { results: [] }, partnershipResponse = [] } } } = fileContent;
  const partnerList = [...PartnerResponse.results, ...partnershipResponse];

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
                <th>Arquivo</th>
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

export default ReadPartnerReport;
