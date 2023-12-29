import React from "react";
import { Col, Container } from "react-bootstrap";
import "./styles.scss";
import { Tab, TabList, Tabs } from "react-tabs";
export const Kanban = ({ columns, cards }) => {
  const columnsList = columns.map((column, index) => {
    return (
      <Container className="container column-status">
        <div className="column-content">
          <div className="column-header">
            <div>{column.title}</div>
            <div className="id">
              {" "}
              {column.id < 10 ? `0${column.id}` : column.id}
            </div>
          </div>

          <Col key={index} md={6}>
            <ul className="cards">
              {cards
                .filter((card) => card.column === column.id)
                .map((card, index) => {
                  return (
                    <li key={index} className="card columns">
                      <div className="card-header">Claudia Lima</div>
                      <div className="card-body">
                        <h6 className="operation">Valor da Operação</h6>
                        <h5 className="operationValue">R$ 600.000.00</h5>
                      </div>
                      <div className="card-body-pending">
                        Documentação pendente
                      </div>
                      <div className="card-footer">Home Equity</div>
                    </li>
                  );
                })}
            </ul>
          </Col>
        </div>
      </Container>
    );
  });

  return <Container>{columnsList}</Container>;
};
