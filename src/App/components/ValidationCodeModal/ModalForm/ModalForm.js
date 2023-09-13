import { useForm } from "react-hook-form";
import InputMask from "../../Form/FormInputs/InputMask";
import { Button, Form } from "react-bootstrap";
import "./style.scss";
import LoadingIndicator from "../../LoadingIndicator";
import { Auth } from "aws-amplify";
import { useCallback, useState } from "react";
import { useAuth } from "../../Auth";
import { useNavigate } from "react-router-dom";

const ModalForm = ({ hideModal, actionsToast: toast }) => {
  const [isValidCode, setIsValidCode] = useState(false);

  const auth = useAuth();

  const validateCode = useCallback((values) => {
    const isEmptyString = (str) => !str || str === "" || str === "_";
    const emptyValues = Object.values(values).filter((value) =>
      isEmptyString(value)
    );

    if (emptyValues.length === 0) setIsValidCode(true);
    else setIsValidCode(false);

    return {
      values,
      errors: {}
    };
  }, []);

  const { handleSubmit, control, formState } = useForm({
    mode: "all",
    resolver: validateCode,
    defaultValues: {
      digit001: "",
      digit002: "",
      digit003: "",
      digit004: "",
      digit005: "",
      digit006: ""
    }
  });

  const errors = {};
  const navigate = useNavigate();

  const handleOnSubmit = async (values) => {
    try {
      const code = Object.values(values).join("");

      await auth.confirmSignup({ ...auth.user, code }, () => {
        hideModal();
        navigate("/login");
      });
    } catch {
      toast.setError("Erro na confirmação de código.");
    }
  };

  const handleResendCode = async () => {
    try {
      await auth.resendCode(auth.user, () => {
        toast.setSuccess("Código de verificação enviado com sucesso!");
      });
    } catch {
      toast.setError("Erro ao reenviar o código de verificação");
    }
  };

  return (
    <>
      {formState.isSubmitting && <LoadingIndicator isFull={true} />}
      <Form
        className="form-validation-code"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="fields-validation-code">
          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit001"}
            mask={"9"}
          />

          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit002"}
            mask={"9"}
          />

          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit003"}
            mask={"9"}
          />

          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit004"}
            mask={"9"}
          />

          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit005"}
            onChange={(event) => console.log("etaa rodou", event)}
            mask={"9"}
          />

          <InputMask
            className="input-validation-code"
            error={errors}
            control={control}
            name={"digit006"}
            mask={"9"}
          />
        </div>
        <div className="buttons-validation-code">
          <Button variant="primary" onClick={handleResendCode}>
            <span style={{ color: "white" }}> Enviar um novo código</span>
          </Button>
          <Button type="onsubmit" variant="primary" disabled={!isValidCode}>
            <span style={{ color: "white" }}> Confirmar </span>
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ModalForm;
