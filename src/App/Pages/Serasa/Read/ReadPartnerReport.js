import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import CreatePartnerButton from "./CreatePartnerButton";

const Partner = ({ partner }) => (
  <>
    <tr key={partner.id}>
      <td>{partner.id}</td>
      <td>{partner.documentNumber}</td>
      <td>{partner.participationPercentage}</td>
      <td>{partner.status || "-"}</td>
      <td>{partner.filePath || "-"}</td>
      <td>
        <CreatePartnerButton partner={partner} />
      </td>
    </tr>
  </>
);

const ListPartners = ({ partners, fileContent }) => {
  const {
    optionalFeatures: {
      partner: { PartnerResponse = { results: [] }, partnershipResponse = [] }
    }
  } = fileContent;

  const partnerList = [...PartnerResponse.results, ...partnershipResponse];

  const combinePartners = () =>
    partners?.map((partner) => {
      const documentKey =
        partner.type === "PF" ? "businessDocument" : "documentId";
      const response = partnerList.find(
        (r) => r[documentKey] === partner.documentNumber
      );

      return response
        ? {
            ...partner,
            participationPercentage: response.participationPercentage
          }
        : partner;
    });

  const combinedPartners = combinePartners();

  return (
    <Container>
      {combinedPartners?.length > 0 && (
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
                  <Partner partner={partner} />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ListPartners;
