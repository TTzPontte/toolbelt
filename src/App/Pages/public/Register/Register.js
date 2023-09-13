import React, { useState } from "react";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import FormPage from "../../../components/Auth/FormPage";
import { useAuth } from "../../../components/Auth";
// import FormPage from "../../../components/Auth/FormPage";
import ValidationCodeModal from "../../../components/ValidationCodeModal";

const RegisterPage = ({ children }) => {
  let auth = useAuth({
    defaultValue: {
      email: "jonny@appleseed.com",
      password: "xxx"
    }
  });

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || `/orgs/home`;
  const navigateFrom = () => navigate(from, { replace: true });
  // todo save user`s name on signup!!
  const props = {
    headerText: "Faça agora o seu cadastro",
    left: {
      title: "Ainda não tem uma conta?",
      buttonText: "Cadastrar",
      action: (event) =>
        auth.signup(event, () => {
          setModalShow(true);
          //navigateFrom();
        })
    },
    right: {
      title: "Já está cadastrado?",
      buttonText: "Entrar",
      action: () => navigateFrom()
    },

    children: ""
  };

  return (
    <>
      <ValidationCodeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <FormPage {...props} />
    </>
  );
};

export default RegisterPage;
