import { Button, Col, Container, Row } from "react-bootstrap";

const RightSide = ({
  title = "Já está cadastrado?",
  buttonText = "Entrar",
  action
}) => (
  <Container className="container-right-side">
    <Row className="justify-content-center">
      <Col className="d-flex justify-content-center`1">
        <div>
          <h2 className={"mb-3"}>{title}</h2>
        </div>
      </Col>
    </Row>
    <Row className="my-3">
      <div className="d-flex">
        <Button onClick={action}>
          <span style={{ color: "white" }}>{buttonText}</span>
        </Button>
      </div>
    </Row>
  </Container>
);

export default RightSide;