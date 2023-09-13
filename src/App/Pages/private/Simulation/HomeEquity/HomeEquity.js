import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "./style.scss";
import StateProvider from "./redux-flow/reducer";
import SimulationForm from "./SimulationForm";
import ContractOperationFlow from "./Flow/ContractOperationFlow";

const HomeEquity = (props) => {
  const [step2, setStep2] = useState(false);
  return (
    <StateProvider>
      {(provider) => (
        <>
          <Container fluid={"lg"} className="simulation">
            {!step2 && (
              <Row>
                <div className="new-contract-body ppl">
                  <Container>
                    <Row>
                      <Col>
                        <>
                          <SimulationForm {...{ ...provider, setStep2 }} />
                        </>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Row>
            )}
            {step2 && (
              <Row>
                <div>
                  <div>
                    <Button
                      className="btn btn-default"
                      onClick={() => setStep2(false)}
                    >
                      <span>back</span>
                    </Button>
                  </div>
                  {provider?.state?.calculatedFlow?.installment && (
                    <>
                      <ContractOperationFlow
                        flow={provider?.state?.calculatedFlow?.installment}
                        error={provider?.state?.error}
                      />
                    </>
                  )}
                </div>
              </Row>
            )}
          </Container>
        </>
      )}
    </StateProvider>
  );
};

export default HomeEquity;
