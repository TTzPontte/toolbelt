import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Kanban } from './components/Kanban';
import { invokeLambda } from "./components/utils";

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

  const isLoading = simulationCards.length === 0 && signUpCards.length === 0;

  return (
    <Container className={"Cards-Page"}>
      <Row>
        {isLoading ? (
          <p>Carregando ...</p>
        ) : (
          <>
            <Kanban columns={'Simulação'} cards={sortedSimulationCards} />
            <Kanban columns={'Cadastro'} cards={sortedSignUpCards} />
          </>
        )}
      </Row>
    </Container>
  );
};

export default Cards;
