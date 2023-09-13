import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/Auth";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LoginComponent from "../../../components/LoginComponent";

const LoginPage = () => {
  // const props = {
  //   navigate: useNavigate(),
  //   location: useLocation(),
  //   auth: useAuth(),
  //   from: location.state?.from?.pathname || "/"
  // };
  return (
    <>
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default LoginPage;

// em produto temos
//  integração quitec
//  corte de custo com Mailchimp
//  Portal do parceiro

export function LoginForm() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (event) => {
    auth.signin(event.username, () => {
      navigate(from, { replace: true });
    });
  };

  console.log(errors);

  return (<>
  <LoginComponent />/</>);
}
