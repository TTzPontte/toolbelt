// Score Display with Radial Progress
import React from "react";
import "./styles.scss";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";

// Score Display with Radial Progress
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

  const strokeWidth = 12;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (score.score / 1000) * circumference;

  return (
    <Col xs={12} md={6} lg={4}>
      <div className="score-card">
        <h3 className="text-center">Score Information</h3>
        <div className="score-circle">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#e0e0e0"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={variant}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
            />
          </svg>
          <div className="score-value">{score.score}</div>
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
