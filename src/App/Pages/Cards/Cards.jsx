import React from "react";
import { Container, Row } from "react-bootstrap";
import { Kanban } from './components/Kanban';

const Cards = () => {
  // Define dados de exemplo para colunas e cards
  const columns = [
    { title: "Simulação", id: 1 },
    { title: "Cadastro", id: 2 },
  ];

  const cards = [
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },

    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },

    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },
    { title: "Tarefa 1", description: "Descrição da tarefa 1", column: 1, status: "Em andamento" },

    { title: "Tarefa 2", description: "Descrição da tarefa 2", column: 2, status: "Concluída" },
  ];

  const onSubmit = async ({ data }) => {
    // Utilize os dados submetidos aqui, se necessário
    console.log({ data });
  };

  return (
    <Container>
      <Row>
      <Kanban columns={columns} cards={cards} /> {/* Renderize o componente Kanban */}
      </Row>
    </Container>
  );
};

export default Cards;