import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { invokeLambda } from "./components/utils";
import KanbanBoard from "./components/KanbanBoard";
import "./components/styles.scss";
const Cards = () => {
  const [simulationCards, setSimulationCards] = useState([]);
  const [signUpCards, setSignUpCards] = useState([]);
  const [sortedSimulationCards, setSortedSimulationCards] = useState([]);
  const [sortedSignUpCards, setSortedSignUpCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await invokeLambda();
        setSimulationCards(fetchedCards.simulation);
        setSignUpCards(fetchedCards.signup);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    if (!simulationCards.length && !signUpCards.length) {
      fetchCards();
    }

    const sortAndSetCards = (cards, setSortedCards) => {
      if (Array.isArray(cards)) {
        const filteredAndSortedCards = cards.sort((a, b) => {
          const dateA = new Date(a._source.createdAt);
          const dateB = new Date(b._source.createdAt);
          return dateB - dateA;
        });

        setSortedCards(filteredAndSortedCards);
      }
    };

    sortAndSetCards(simulationCards, setSortedSimulationCards);
    sortAndSetCards(signUpCards, setSortedSignUpCards);
  }, [simulationCards, signUpCards]);

  const isLoading =
    sortedSimulationCards.length === 0 && sortedSignUpCards.length === 0;

  return (
    <Container className={"Cards-Page"}>
      <Row>
        {isLoading ? (
          <p>Carregando ...</p>
        ) : (
          <>
            <KanbanBoard
              simulationColumnData={sortedSimulationCards}
              signUpColumnData={sortedSignUpCards}
            ></KanbanBoard>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Cards;
