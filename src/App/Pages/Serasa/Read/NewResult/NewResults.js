import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import ScoreCard from "./ScoreCard/ScoreCard";
import "./styles.scss"; // Import your custom CSS file

// Reusable Table Component
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

const renderNegativeDataRow = (item, negativeData) => (
  <tr key={item}>
    <td>{item}</td>
    <td>{negativeData[item].summary.count}</td>
    <td>{negativeData[item].summary.balance}</td>
  </tr>
);

const renderFactsDataRow = (item, facts) => (
  <tr key={item}>
    <td>{item}</td>
    <td>{facts[item].summary.count}</td>
  </tr>
);

// Reusable FactsTable Component
const FactsTable = ({ data, headers, renderRow }) => (
  <CustomTable data={data} headers={headers} renderRow={renderRow} />
);

const NewResults = ({ reports }) => {
  const { registration, negativeData, score, facts } = reports[0];
  const name = registration?.companyName || registration.consumerName;

  return (
    <Container>
      <Row>
        <span>
          <h2 className="text-center mt-4 mb-4">
            Negative Data Report for: <h3>{name}</h3>
          </h2>
        </span>
      </Row>

      <Row>
        <Col>
          {/*<Col xs={12} md={6} lg={4}>*/}
          <div className="table-card">
            <h3 className="text-center">Negative Data</h3>
            <CustomTable
              data={Object.keys(negativeData)}
              headers={["Title", "Count", "Balance"]}
              renderRow={(item) => renderNegativeDataRow(item, negativeData)}
            />
          </div>
        </Col>
      </Row>
      <Row className={'d-flex justify-content-center align-content-center'}>

        <Col >
          <div className="table-card">
            <h3 className="text-center">Facts</h3>
            <FactsTable
              data={Object.keys(facts)}
              headers={["Title", "Count"]}
              renderRow={(item) => renderFactsDataRow(item, facts)}
            />
          </div>
        </Col>
          <Col>
              <ScoreCard scoreData={score} />
          </Col>
      </Row>
    </Container>
  );
};

export default NewResults;
