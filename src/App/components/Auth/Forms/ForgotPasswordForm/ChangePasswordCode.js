import { Button, Form } from "react-bootstrap";
import Btn from "../../../Btn/Btn"
import { useState } from "react";
import { useAuth } from "../../useAuth";
import { resendCode } from "../../../Auth/helpers"

import { FormProvider, useForm } from "react-hook-form";
import FormWizard from "../../../Form/FormWizard/FormWizard";
import { useToastily } from "../../../Toastily/useToastily";
import Toastily from "../../../Toastily/Toastily";

const ChangePasswordCode = ({username, handlePasswordChange}) => {
  const methods = useForm({ mode: "all" });
  const [isValidCode, setIsValidCode] = useState(false);
  const auth = useAuth();
  const { toast, actions } = useToastily();
  const { handleSubmit, isSubmitting, setError } = methods;

  const onSubmit = async (event) => {
    let code = event.digit001 + event.digit002 + event.digit003 + event.digit004 + event.digit005 + event.digit006;
    let options = {code: code, username: username, password: event.password};
    try {
      const response = await auth.sendForgotPasswordCode(options)
      handlePasswordChange(response)
    } catch (error) {
      if (error.name === "CodeMismatchException") {
        setError("password", {"message": "Código invalido."})
      }
    }
  };

  const fields = [
    {
      id: "code",
      name: "code",
      label: "",
      type: "code",
      options: []
    },
    {
      id: "password",
      name: "password",
      label: "Nova senha",
      type: "password",
      options: []
    }
  ]

  const onResendCode = async (event) => {
    try {
      let response = await auth.sendForgotPassword(username)
      actions.setSuccess("Um novo codigo foi enviado para seu email.")
    } catch (error) {
      actions.setError("Não foi possivel enviar seu codigo. Tente novamente em alguns instantes.")
    }
  }

  return (
    <>
      <div>
      <p>Enviamos um código de 6 dígitos para o seu email cadastrado, digite aqui para alterar sua senha.</p>
      <Toastily  {...{ ...toast }} />
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-user-invite">
          <FormWizard {...{ fields }} />
          <div className="buttons-validation-code">
            <Btn variant="primary" onClick={() => onResendCode()} title={"Enviar um novo código"}>
              <span style={{ color: "white" }}> Enviar um novo código</span>
            </Btn>
            <Btn type="submit" variant="primary"  title={"Confirmar"}>
              <span style={{ color: "white" }}> Confirmar </span>
            </Btn>
          </div>
        </Form>
      </FormProvider>
      </div>
    </>
  )
}

export default ChangePasswordCode;