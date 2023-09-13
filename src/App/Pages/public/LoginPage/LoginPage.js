import React from "react";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import FormPage from "../../../components/Auth/FormPage";
import { useAuth } from "../../../components/Auth";
// import FormPage from "../../../components/Auth/FormPage";

const RegisterPage = () => {
  let auth = useAuth({
    defaultValue: {
      email: "jonny@appleseed.com",
      password: "xxx",
      isAuthenticated: false
    }
  });

  const navigate = useNavigate();

  const props = {
    headerText: "Faça agora o seu login",
    left: {
      title: "Já está cadastrado?",
      buttonText: "Entrar",
      action: (event) => auth.signin(event, () => navigate(`/orgs/home`))
    },
    right: {
      title: "Ainda não tem uma conta?",
      buttonText: "Cadastrar",
      action: () => navigate("/register")
    },

    children: []
  };

  return (
    <>
      <FormPage {...props} />
    </>
  );
};

export default RegisterPage;
