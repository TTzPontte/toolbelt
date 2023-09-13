import React from "react";
import { Container } from "react-bootstrap";
import Toastily from "../../../../components/Toastily/Toastily";
import { useToastily } from "../../../../components/Toastily/useToastily";
import FormInvite from "./FormInvite";
import "./styles.scss";

const Invite = () => {
  const { toast, actions } = useToastily();

  return (
    <>
      <Toastily {...toast} />
      <Container className="container-user-invite">
        <header className="L-title">
          Envie um convite para fazer parte do Portal do Parceiro!
        </header>
        <FormInvite {...{ actions }} />
      </Container>
    </>
  );
};

export default Invite;
