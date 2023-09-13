import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const HelpContent = (props) => {
  function resizeIframe(obj) {
    console.log(obj);
    const target_height = obj.target.style.height;
    const documentHeigth = document.documentElement.scrollHeight + "px";
    console.log({ target_height, documentHeigth });
    obj.target.style.height = documentHeigth || "100vh"
  }

  return (
    <Container fluid className="h-100">
      <Row className="h-100 w-100 d-flex">
        <Col className="h-100 w-100 d-flex">
          {/*<div style={{ height: "100%" }}>*/}
            <Row className="w-100">
            {
              <iframe
                id="Iframe"
                title="Iframe"
                style={{
                  height: "auto",
                  width: "100%",
                  overflow: "hidden !important"
                }}
                scrolling="no"
                onLoad={resizeIframe}
                // onLoadCapture={(e) => resizeIframe(e)}
                src="https://www.sejaparceiro.pontte.com.br/cópia-material-de-apoio-1"
              />
            }
            </Row>
          {/*</div>*/}
        </Col>
      </Row>
     </Container>
  );
};

export default HelpContent;
