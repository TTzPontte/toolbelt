import React from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import Results from "../../../../Containers/Searches/Result/Results";
import ReadPartnerReport from "../../Read/components/old/ReadPartnerReport";

const ReadReportResults = ({
  response,
  partners,
  reports,
  personType,
  handleDownloadPDF
}) => {
  return (
    <Container>
      {reports && reports.length >0&&(
          <Col>
        <Card>
          <Card.Body>
            {reports && reports.length > 0 && <Results list={reports} />}
            <br />
            {reports.length > 0 && (
              <Button onClick={handleDownloadPDF}>Baixar Relatório PDF</Button>
            )}
          </Card.Body>
        </Card>
        <Card>
          {/*<Results list={partners} pfOuPj="PJ" />*/}
          {partners && partners.length > 0 && (
            <ReadPartnerReport partners={partners} pfOuPj="PJ" />
          )}
        </Card>
      </Col>)}
    </Container>
  );
};

export default ReadReportResults;
