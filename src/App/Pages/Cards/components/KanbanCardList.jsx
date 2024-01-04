import React from "react";
import KanbanCard from "./KanbanCard";

const KanbanCardList = ({ cards }) => {
  return (
    <ul className="cards">
      {cards.map((card, index) => (
        <KanbanCard key={index} card={card} />
      ))}
    </ul>
  );
};

export default KanbanCardList;
