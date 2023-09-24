import React, { useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import CreatePartnerButton from "./CreatePartnerButton";


const ReadPartnerReport = ({ partners, fileContent }) => {
  const {
    optionalFeatures,
    optionalFeatures: {
      partner: { partnershipResponse }
    }
  } = fileContent;

  // Combine partner data with partnershipResponse
  const combinedPartners = partners?.map((partner) => {
    const response = partnershipResponse.find(
      (r) => r.businessDocument === partner.documentNumber
    );
    console.log({partner})
    if (response) {
      return {
        ...partner,
        participationPercentage: response.participationPercentage,
        updateDate: response.updateDate,
        participationInitialDate: response.participationInitialDate
      };
    }

    return partner;
  });

  return (
    <Container>
      {combinedPartners.length > 0 && (
        <Card>
          <Card.Header>
            <h2>Partner Report</h2>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>CNPJ</th>
                  <th>% Participação</th>
                  <th>Data da atualização do status</th>
                  <th>participationInitialDate</th>
                  <th>status</th>
                  <th>filePath</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {combinedPartners.map((partner) => (
                  <tr key={partner.id}>
                    <td>{partner.id}</td>
                    <td>{partner.documentNumber}</td>
                    <td>{partner.participationPercentage}</td>
                    <td>{partner.updateDate}</td>
                    <td>{partner.participationInitialDate}</td>
                    <td>{partner.status}</td>
                    <td>{partner.filePath}</td>
                    <td>
                      {console.log({partner})}
                      <CreatePartnerButton partner={partner} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ReadPartnerReport;
