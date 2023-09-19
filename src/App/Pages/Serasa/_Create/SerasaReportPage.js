import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SerasaReportForm from "./SerasaReportForm"; // Import the Form component
import "./style.scss";

const SerasaReportPage = () => {
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Handle form submission logic here
    };

    return (
        <Container className="container">
            <h1>Create Serasa Report</h1>
            <Row>
                <Col>
                    <Card className="card">
                        <Card.Body>
                            <SerasaReportForm onSubmit={onSubmit} /> {/* Render the Form component */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SerasaReportPage;
