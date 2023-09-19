import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row } from "react-bootstrap";
import Input from "../../Form/FormInputs/Input";
import { useLocation } from "react-router-dom";
import { validateForm, mapperError } from "./helpers";
import { useAuth } from "../useAuth";
import LoadingIndicator from "../../LoadingIndicator";

function getPartnerFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("organizationId") || "";
}

const RegisterForm = ({ action, buttonText = "Cadastrar" }) => {
  const [errors, setErrors] = useState(null);

  let location = useLocation();

  const { pathname } = location || "/";

  const auth = useAuth();

  const getErrorSubmit = useCallback(() => {
    const msg = auth.error ? mapperError(auth.error.type) : null;
    if (msg) setErrors({ password: { message: msg } });
  }, [auth.error]);

  useEffect(() => {
    getErrorSubmit();
  }, [getErrorSubmit]);

  const handleLoginValidate = useCallback((values) => {
    const { errors } = validateForm(values);

    setErrors(errors);

    return {
      values,
      errors: errors || {}
    };
  }, []);

  const initialValues = useCallback((values) => {
    return {
      name: "",
      email: "",
      password: ""
    };
  }, []);

  const { formState, control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: initialValues(),
    resolver: handleLoginValidate
  });

  const onSubmit = async (event) => {
    return await action(event);
  };

  return (
    <>
      {formState.isSubmitting && <LoadingIndicator isFull={true} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {pathname !== "/login" && (
          <>
            <Input
              control={control}
              type="text"
              name="name"
              placeholder="Nome"
              defaultValue=""
            />
          </>
        )}

        <Input
          error={errors}
          control={control}
          type="email"
          name="email"
          placeholder="email"
          defaultValue=""
        />

        <Input
          error={errors}
          control={control}
          type="password"
          name="password"
          placeholder="password"
          defaultValue=""
        />

        <Input
          errors={{}}
          control={control}
          type="hidden"
          name="custom:organizationId"
          defaultValue={getPartnerFromUrl()}
        />
        <Form.Group className="mb-3" controlId="submit">
          <Row justify="center" width="100%">
            <Button
              style={{ margin: "0 auto" }}
              type="submit"
              disabled={formState.isSubmitting}
              className="btn btn-primary white-button"
            >
              {buttonText}
            </Button>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
};

export default RegisterForm;