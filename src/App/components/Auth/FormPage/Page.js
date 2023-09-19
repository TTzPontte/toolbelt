import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";

/*  Components  */
const ConsentBox = () => (
  <div className="consent-box">
    <p className="consent">
      Ao continuar, você concorda com a nossa&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="site-porttal-factory-0-2-1934 site-porttal-factory-d0-0-2-1936 site-porttal-typography-0-2-1927 site-porttal-typography-d0-0-2-1931 site-porttal-link-0-2-1924 site-porttal-classSignUpRouterLink-0-2-1695 site-porttal-typographyFluid-0-2-1930 site-porttal-typographyFluid-d2-0-2-1933"
        href="/politica-de-privacidade"
      >
        Política de Privacidade&nbsp;
      </a>
      e o uso das suas informações pela Pontte, tudo bem?
    </p>
  </div>
);

const LeftSide = ({ title = "" }) => (
  <Container>
    <div style={{ marginBottom: "48px", textAlign: "inherit" }}>
      <h2>{title}</h2>
    </div>
    <RegisterForm />
    <ConsentBox />
  </Container>
);

const RightSide = ({ title, buttonText, action }) => (
  <Container>
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

/* Page */

const PageHeader = ({ headerText = "" }) => (
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

const PageBody = ({ left, right }) => {
  return (
    <>
      <Row>
        <Col lg={5}>
          <LeftSide {...left} />
        </Col>
        <Col sm={1}>
          <hr className="line" />
        </Col>
        <Col lg={5} justify="center">
          <RightSide {...right} />
        </Col>
      </Row>
    </>
  );
};

// const Page = ({ headerText, left: { title }, right: {}, children }) => (
const FormPage = ({ headerText , ...rest }) => (
  <>
    <Container>
      <Container fluid className="L">
        <Container>
          <>
            <PageHeader {...{ headerText }} />
            <PageBody {...rest} />
          </>
        </Container>
      </Container>
    </Container>
  </>
);

export default FormPage;
