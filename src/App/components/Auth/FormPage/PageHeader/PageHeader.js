import { Col, Container, Row } from "react-bootstrap";

const PageHeader = ({ headerText }) => (
  <Row>
    <Col lg={"8"}>
      <Container className={"main-box"}>
        <Row>
          <h1 className={"L-title"}>{headerText}</h1>
        </Row>
      </Container>
    </Col>
  </Row>
);

export default PageHeader;