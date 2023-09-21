import React from "react";
import { Card, Container, Table, Button } from "react-bootstrap";

const CreatePartnerButton = () => {
  return (
    <Button className={"button btn-sm"} variant="primary">
      Your Button
    </Button>
  );
};
const ReadPartnerReport = ({ partners }) => {
  return (
    <Container>
      {partners.length > 0 && (
        <Card>
          <Card.Header>
            <h2>Partner Report</h2>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>CNPJ</th>
                  <th>% Participação</th>
                  <th>Data da atualização do status</th>
                  <th>participationInitialDate</th>
                  <th>Actions</th> {/* New column for the button */}
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                    <tr key={partner.id}>
                        <td>{partner.businessDocument}</td>
                        <td>{partner.participationPercentage}</td>
                        <td>{partner.updateDate}</td>
                        <td>{partner.participationInitialDate}</td>
                        <td>
                            <CreatePartnerButton />
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
