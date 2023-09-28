import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import CreateOrViewPartnerButton from "./CreateOrViewPartnerButton";

// Component to render partner reports in a table row
const PartnerTableRow = ({ partner }) => {
  const { id, documentNumber, participationPercentage, status, filePath } = partner;

  return (
      <tr key={id}>
        <td>{id}</td>
        <td>{documentNumber}</td>
        <td>{participationPercentage}</td>
        <td>{status || "-"}</td>
        <td>{filePath || "-"}</td>
        <td>
          <CreateOrViewPartnerButton partner={partner} />
        </td>
      </tr>
  );
};

// Component to render partner reports in a table
const PartnerReportTable = ({ combinedPartners }) => (
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
          {combinedPartners.map((partner) => (
              <PartnerTableRow key={partner.id} partner={partner} />
          ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
);

const combinePartners = (partners, partnerList) => {
  return partners?.map((partner) => {
    const documentKey = partner.type === "PJ" ? "businessDocument" : "documentId";
    const response = partnerList.find((r) => r[documentKey] === partner.documentNumber);

    return response
        ? { ...partner, participationPercentage: response.participationPercentage }
        : partner;
  });
};

const ReadPartnerReport = ({ partners, fileContent }) => {
  const {
    optionalFeatures: {
      partner: { PartnerResponse = { results: [] }, partnershipResponse = [] },
    },
  } = fileContent;

  const partnerList = [...PartnerResponse.results, ...partnershipResponse];

  const combinedPartners = combinePartners(partners, partnerList);

  return (
      <Container>
        <PartnerReportTable combinedPartners={combinedPartners} />
      </Container>
  );
};

export default ReadPartnerReport;
