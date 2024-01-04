// components/KanbanBoard.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ simulationColumnData, signUpColumnData }) => {

  return (
      <Row className="column-status">
          <Col>
            <KanbanColumn
              columnTitle="Simulação"
              cards={simulationColumnData}
            />
          <KanbanColumn
              columnTitle="Cadastro"
              cards={signUpColumnData}
            />
          </Col>
      </Row>
  );
};

export default KanbanBoard;
