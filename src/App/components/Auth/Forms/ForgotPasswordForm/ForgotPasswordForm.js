import { Button, Form } from "react-bootstrap";
import Btn from "../../../Btn/Btn"
import { useAuth } from "../../useAuth";

import { FormProvider, useForm } from "react-hook-form";
import FormWizard from "../../../Form/FormWizard/FormWizard";
import ConfirmationCodeModal from "../../../ConfirmationCodeModal/ModalForm"


const ForgotPasswordForm = ({onCodeSendHandler}) => {
  const methods = useForm({ mode: "all" });
  const auth = useAuth();
  const { handleSubmit, isSubmitting, setError } = methods;

  const onSubmit = async (event) => {
    try {
      const result = await auth.sendForgotPassword(event.email)
      onCodeSendHandler(event)
    } catch (error) {
      if (error.name === "LimitExceededException") {
        setError("email", {type: "focus", message: "Limite de tentativas excedido. Tente novamente mais tarde."})
      } else if (error.name === "UserNotFoundException") {
        setError("email", {type: "focus", message: "Não existe um úsuario com este email."})
      }
    }
  };

  const fields =   [{
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    options: []
  }
]

  return (
    <>
      <div>
      <p>Por favor, coloque aqui o seu e-mail cadastrado para lhe enviarmos um link de recuperação.</p>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-user-invite">
          <FormWizard {...{ fields }} />
          <Btn
            style={{ margin: "0 auto" }}
            type="submit"
            className="btn btn-primary white-button btn-user-invite"
            disabled={isSubmitting}
            title={"Continuar"}
          >
            Enviar
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1" />
            )}
          </Btn>
        </Form>
      </FormProvider>
      </div>
    </>
  )
}

export default ForgotPasswordForm;