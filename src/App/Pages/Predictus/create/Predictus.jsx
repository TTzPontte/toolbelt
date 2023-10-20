import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputForm from "./InputForm";

function Predictus() {
  return (
    <Container>
      <Row className={"d-flex  justify-content-center align-content-center "}>
        <Col lg={6} md={6} className={"d-flex"}>
          <InputForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Predictus;
