import { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Form/FormInputs/Input";
import { useAuth } from "../../../../components/Auth/useAuth";
import { validateForm } from "./helpers";
import { DataStore } from "@aws-amplify/datastore";
import { UserInvite as UserInviteModel } from "../../../../../models";
import "./styles.scss";

const FormInvite = ({ actions: actionsToast }) => {
  const [errorValidate, setError] = useState({});

  const { user } = useAuth();

  const handleInviteValidate = useCallback((values) => {
    const { errors } = validateForm(values);

    setError(errors);

    return {
      values,
      errors: errors || {}
    };
  }, []);

  const { formState, handleSubmit, control } = useForm({
    mode: "all",
    resolver: handleInviteValidate
  });

  const onSubmit = async (event) => {
    try {
      const { email } = event;
      
      if (!user["custom:organizationId"])
        throw new Error("organizationId is Not Found");

      const userInvite = await DataStore.save(
        new UserInviteModel({
          email: email,
          organizationID: user["custom:organizationId"],
          status: "pending"
        })
      );
      console.log({ userInvite });
      actionsToast.setSuccess("Convite enviado com sucesso!");

      return userInvite;
    } catch (error) {
      console.log('error in userInvite', {error})
      actionsToast.setError(
        "Não foi possível enviar o convite. Tente novamente mais tarde."
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form-user-invite">
      <Input
        error={errorValidate}
        control={control}
        type="email"
        name="email"
        placeholder="email"
      />

      <Button
        style={{ margin: "0 auto" }}
        type="submit"
        className="btn btn-primary white-button btn-user-invite"
        disabled={formState.isSubmitting}
      >
        Enviar
        {formState.isSubmitting && (
          <span className="spinner-border spinner-border-sm mr-1" />
        )}
      </Button>
    </Form>
  );
};

export default FormInvite;
