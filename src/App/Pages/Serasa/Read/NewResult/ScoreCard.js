import React from "react";
import "./styles.scss";
import { Badge, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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
                                textSize: "20px",
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

export default ScoreCard;
