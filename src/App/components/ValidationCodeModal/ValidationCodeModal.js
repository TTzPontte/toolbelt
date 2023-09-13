import { Modal } from "react-bootstrap";
import Form from "./ModalForm";
import Toastily from "../Toastily/Toastily";
import { useToastily } from "../Toastily/useToastily";

const ValidationCodeModal = (props) => {
  const { toast, actions } = useToastily();

  return (
    <>
      <Toastily {...toast} />

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h1 className="L-title">Digite seu código de verificação</h1>
        </Modal.Header>
        <Modal.Body>
          <p>
            Para sua segurança, queremos confirmar se realmente é você quem fez
            o cadastro. Enviamos um código de verificação de seis dígitos para o
            seu e-mail cadastrado.
          </p>
          <Form hideModal={props.onHide} actionsToast={actions} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ValidationCodeModal;
