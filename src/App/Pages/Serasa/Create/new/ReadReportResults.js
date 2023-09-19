import React from "react";
import {
    Col,
    Button,
    Container,
    Card
} from "react-bootstrap";
import Results from "../../../../Containers/Searches/Result/Results";

const ReadReportResults = ({ response, partners, reports, personType, handleDownloadPDF }) => {
    return (
      <Container>
        <h1>Create Serasa Report</h1>
        <Col>
          <Card>
            <Card.Body>
              {reports && reports.length > 0 &&(<Results list={reports} />)}
              <br />
              {reports.length > 0 && (
                <Button onClick={handleDownloadPDF}>
                  Baixar Relatório PDF
                </Button>
              )}
            </Card.Body>
          </Card>
          <Card>
              {partners && partners.length > 0 &&(<Results list={partners}  pfOuPj="PJ"  />)}
          </Card>
        </Col>
      </Container>
    );
};

export default ReadReportResults;
