import React from "react";
import {Col, Badge, Card, Row, Container} from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ScoreCard.scss"; // Import CSS file for styles

const determineScoreVariant = (score) => {
    if (score < 400) return "danger";
    if (score < 700) return "warning";
    return "success";
};

const determineScoreFeedback = (score) => {
    if (score < 400) return "Poor Score";
    if (score < 700) return "Average Score";
    return "Good Score";
};

const convertToPercentage = (defaultRate) => {
    const number = Number(defaultRate);
    if (isNaN(number)) {
        // Handle invalid input gracefully
        return "N/A";
    }
    const percentage = (number * 100).toFixed(2); // Convert to a percentage with two decimal places
    return percentage;
};

const ScoreCard = ({ scoreData }) => {
    const { score, scoreModel, defaultRate, message } = scoreData;
    const variant = determineScoreVariant(score);
    const feedback = determineScoreFeedback(score);
    const percentage = (score / 1000) * 100;

    return (
        <Col xs={12} md={6} lg={8}>
            <Card className="score-card">
                <Card.Header className={`text-${variant}`}>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <strong>Score Information</strong>
                        </Col>
                        <Col xs={4} className="text-right">
                            <Badge variant={variant}>{feedback}</Badge>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-center mb-3">
                        <CircularProgressbar
                            value={percentage}
                            text={`${score}%`}
                            styles={buildStyles({
                                pathColor: variant,
                                textSize: "24px",
                            })}
                        />
                    </div>
                </Card.Body>
                <Card.Footer>
                    {scoreModel && (
                        <div className="mb-2">
                            <strong>Score Model:</strong> {scoreModel}
                        </div>
                    )}
                    {message && (
                        <div className="mb-2">
                            <span>{message}</span>
                        </div>
                    )}
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default ScoreCard;
