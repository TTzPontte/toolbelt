import React from "react";
import { Col, Container } from "react-bootstrap";
import "./styles.scss";
import { formatNumber } from "./utils";

export const Kanban = ({ columns, cards }) => {
  return (
    <Container className="container column-status">
      <div className="column-content">
        <div className="column-header">
          <div>{columns}</div>
        </div>

        <Col md={6}>
          <ul className="cards">
            {cards
              .map((card, index) => {
                return (
                  <li
                    key={index}
                    className="card columns"
                    onClick={() => {
                      window.open(
                        `https://torrecontrole.pontte.com.br/contracts/${card._id}`,
                        "_blank"
                      );
                    }}
                    style={{
                      borderTop: `3px solid ${card._source.statusContract.color}`
                    }}
                  >
                    <div className="card-header">
                      {card._source.simulation.parameters.email}
                    </div>
                    <div className="card-body">
                      <h6 className="operation">Valor da Operação</h6>
                      <h5 className="operationValue">
                        R${" "}
                        {formatNumber(
                          card._source.simulation.parameters.loanValue
                        )}
                      </h5>
                    </div>
                    <div className="card-body-pending">
                      {card._source.simulation.parameters.loanMotivation ? card._source.simulation.parameters.loanMotivation[0] : ""}
                    </div>
                    <div className="card-footer">
                      {new Date(card._source.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </Col>
      </div>
    </Container>
  );
};
