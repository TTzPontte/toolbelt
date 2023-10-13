import React from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import "./styles.scss"; // Import your custom CSS file

const CustomTable = ({ data, headers, renderRow }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        {headers.map((header) => (
          <th className="text-uppercase" key={header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map(renderRow)}</tbody>
  </Table>
);

const renderDataRow = (item, summary) => {
  let title = item;
  if (item === "collectionRecords") {
    title = "Registros";
  }
  if (item === "check") {
    title = "Cheque sem fundo";
  }
  if (item === "notary") {
    title = "Protestos";
  }
  return (
    <tr key={item}>
      <td>{title}</td>
      {summary.balance !== undefined && <td>{summary.balance}</td>}
      <td>{summary.count}</td>
    </tr>
  );
};

const FactsTable = ({ data, headers, scoreData }) => (
  <CustomTable
    data={Object.keys(data)}
    headers={["Title", "Balance", "Count"]}
    renderRow={(item) => renderDataRow(item, data[item].summary)}
  >
    {scoreData && (
      <tr>
        <td>Score</td>
        <td colSpan={2}>{scoreData}</td>
      </tr>
    )}
  </CustomTable>
);

const ScoreTable = ({ scoreData }) => {
  const { score, scoreModel, defaultRate, message } = scoreData;

  return (
    <Table striped bordered hover responsive>
      <tbody>
      {score && (
          <tr>
              <td>
                  <strong>Score:</strong>
              </td>

              <td>
                  <h1 style={{ fontSize: '16px', fontWeight: 'bold' }}>{score}</h1>
              </td>
          </tr>
      )}


      </tbody>
    </Table>
  );
};

const NewResults = ({ reports , handleDownloadPDF}) => {
  const { registration, negativeData, score, facts, scoreModel, message } =
    reports[0];
  const name = registration?.companyName || registration.consumerName;

  return (
    <Container>
      <Row className="mt-4 mb-4">
        <h2 className="text-center">
          <h3>{name}</h3>
        </h2>
      </Row>
        {reports.length > 0 && (

            <Row>
                <Col>
                    <Button onClick={handleDownloadPDF}>
                        Baixar Relatório PDF
                    </Button>
                </Col>
            </Row>
        )}
      <Row>
        <div className="table-card">
          <h3 className="text-center">Apontamentos</h3>
          <CustomTable
            data={Object.keys(negativeData)}
            headers={["ocorrência", "valor", "quantidade"]}
            renderRow={(item) =>
              renderDataRow(item, negativeData[item].summary)
            }
          />
        </div>
        <div className="table-card">
          <ScoreTable scoreData={score} />
        </div>
      </Row>
    </Container>
  );
};

export default NewResults;
