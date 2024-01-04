import React from "react";
import KanbanCardList from "./KanbanCardList";

const KanbanColumn = ({ columnTitle, cards }) => {
  return (
    <div className="column-content">
      <div className="column-header">
        <div>{columnTitle}</div>
      </div>
      <KanbanCardList cards={cards} />
    </div>
  );
};

export default KanbanColumn;