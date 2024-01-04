import React from "react";
import { Container, Row, Col, Card, Dropdown, Button } from "react-bootstrap";

const InternalToolSelection = () => {
    const tools = [
        {
            title: "OCR",
            description: "Optical Character Recognition",
            link: "/tool1", // Replace with the actual URL for Tool 1
        },
        {
            title: "Serasa",
            description: "Credit Report Service",
            link: "/serasa/new", // Replace with the actual URL for Tool 2
        },
        {
            title: "Predictus",
            description: "Data Analysis Tool",
            link: "/predictus", // Replace with the actual URL for Tool 3
        },
        {
            title: "Cards",
            description: "Cards from Torre de Controle",
            link: "/cards", // Replace with the actual URL for Tool 3
        },
    ];

    const cardHeader = (title) => (
        <Card.Header className="py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            <Dropdown>
                <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"
                />
                <Dropdown.Menu>
                    <Dropdown.Header>Internal Tools:</Dropdown.Header>
                    {tools.map((tool) => (
                        <Dropdown.Item key={tool.title} href={tool.link}>
                            {tool.title}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Card.Header>
    );

    return (
        <Container fluid lg="lg">
            <Row>
                {tools.map((tool) => (
                    <Col key={tool.title} xl={4} lg={4} md={6} sm={12}>
                        <Card className="mb-4">
                            {cardHeader(tool.title)}
                            <Card.Body>
                                <h5 className="card-title">{tool.title}</h5>
                                <p className="card-text">{tool.description}</p>
                                <Button variant="primary" href={tool.link}>
                                    Access {tool.title}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default InternalToolSelection;
