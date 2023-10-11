import React from "react";
import "./styles.scss";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreCard = ({ score }) => {
  const determineScoreVariant = () => {
    if (score.score < 400) return "danger";
    if (score.score < 700) return "warning";
    return "success";
  };

  const determineScoreFeedback = () => {
    if (score.score < 400) return "Poor Score";
    if (score.score < 700) return "Average Score";
    return "Good Score";
  };

  const variant = determineScoreVariant();
  const feedback = determineScoreFeedback();

  // Calculate the percentage value for the progress bar
  const percentage = (score.score / 1000) * 100;

  return (
    <Col xs={12} md={6} lg={4}>
      <div className="score-card">
        <h3 className="text-center">Score Information</h3>
        <div className="d-flex justify-content-center">
          <div style={{ width: "100px", height: "100px" }}>
            <CircularProgressbar
              value={percentage}
              text={`${score.score}`}
              styles={buildStyles({
                pathColor: variant,
                textSize: "20px"
              })}
            />
          </div>
        </div>
        <div className="score-details mt-2 text-center">
          <div>
            <strong>Score Model:</strong> {score.scoreModel}
          </div>
          <div>
            <strong>Default Rate:</strong> {score.defaultRate}
          </div>
          <Badge variant={variant}>{feedback}</Badge>
        </div>
      </div>
    </Col>
  );
};

// Reusable Table Section
const TableSection = ({ data, headers, renderRow, title }) => (
  <Col xs={12} md={6} lg={4}>
    <div className="table-card">
      <h3 className="text-center">{title}</h3>
      <Table striped bordered hover responsive="sm">
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
    </div>
  </Col>
);

const NewResults = ({ reports }) => {
  const { registration, negativeData, score, facts } = reports[0];

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">
        Negative Data Report for {registration.consumerName}
      </h1>
      <Row>
        <TableSection
          data={Object.keys(negativeData)}
          headers={["Title", "Count", "Balance"]}
          renderRow={(item) => (
            <tr key={item}>
              <td>{item}</td>
              <td>{negativeData[item].summary.count}</td>
              <td>{negativeData[item].summary.balance}</td>
            </tr>
          )}
          title="Negative Data"
        />
        <ScoreCard score={score} />
        <TableSection
          data={Object.keys(facts)}
          headers={["Category", "Count"]}
          renderRow={(item) => (
            <tr key={item}>
              <td>{item}</td>
              <td>{facts[item].summary.count}</td>
            </tr>
          )}
          title="Facts Information"
        />
      </Row>
    </Container>
  );
};

export default NewResults;
