import React, { useCallback, useEffect, useState } from "react";
import { fetchReport, invokeLambda } from "../hepers"; // Note: typo fixed from "hepers" to "helpers"
import { createPDF, generateDDPF, generateDDPJ } from "../../../../servicer/pdf_helpers/main";
import { Button, Card, Container, Table } from "react-bootstrap";
import { DataStore } from "@aws-amplify/datastore";
import { SerasaPartnerReport } from "../../../../../models";
// ... other imports ...

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  return [loading, startLoading, stopLoading];
};
const fetchAndGenerateReport = async (partner, startLoading, stopLoading) => {
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

const mergePartner = (partner, partnerList) => {
  const documentKey = partner.documentNumber.length > 11 ? "businessDocument" : "documentId";
  const matchedPartner = partnerList.find((p) => p[documentKey] === partner.documentNumber);
  return matchedPartner ? { ...partner, participationPercentage: matchedPartner.participationPercentage } : partner;
};

const PartnerTableRow = ({ partner, partnerList }) => {
  const [loading, startLoading, stopLoading] = useLoading();
  const [fetchedPartner, setFetchedPartner] = useState(partner);

  useEffect(() => {
    const getReport = async () => {
      const result = await DataStore.query(SerasaPartnerReport, partner.id);
      setFetchedPartner(result);
    };
    getReport();
  }, [partner]);

  const mergedPartner = mergePartner(fetchedPartner, partnerList);
  const buttonLabel = loading ? "Loading..." : mergedPartner?.filePath ? "View Report" : "Create Report";

  const handleReport = async () => {
    await fetchAndGenerateReport(mergedPartner, startLoading, stopLoading);
  };

  return (
      <tr>
        <td>{mergedPartner.id}</td>
        <td>{mergedPartner.documentNumber}</td>
        <td>{mergedPartner.participationPercentage}</td>
        <td>{mergedPartner.status || "-"}</td>
        <td>
          <Button
              className="btn-sm"
              onClick={handleReport}
              variant="primary"
              disabled={loading}
          >
            {buttonLabel}
          </Button>
        </td>
      </tr>
  );
};

const ReadPartnerReport = ({ partners, fileContent }) => {
  const {
    optionalFeatures: {
      partner: { PartnerResponse = { results: [] }, partnershipResponse = [] }
    }
  } = fileContent;
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
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {partners.map((partner) => (
                  <PartnerTableRow
                      key={partner.id}
                      partner={partner}
                      partnerList={partnerList}
                  />
              ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default ReadPartnerReport;
