import React from "react";
import { formatNumber } from "./utils";

const KanbanCard = ({ card }) => {
  return (
    <li
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
          {formatNumber(card._source.simulation.parameters.loanValue)}
        </h5>
      </div>
      <div className="card-body-pending">
        {card._source.simulation.parameters.loanMotivation
          ? card._source.simulation.parameters.loanMotivation[0]
          : ""}
      </div>
      <div className="card-footer">
        {new Date(card._source.createdAt).toLocaleDateString("pt-BR")}
      </div>
    </li>
  );
};

export default KanbanCard;
