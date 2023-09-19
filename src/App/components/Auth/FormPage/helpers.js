/* eslint-disable no-useless-escape */

const validateForm = (values) => {
  const validateEmail = (value) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };

  const validatePassword = (value) => {
    let re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[a-zA-Z0-9\S]{8,}$/;
    return re.test(value);
  };

  const errors = {};

  if (!validateEmail(values.email)) {
    errors.email = {
      message: "Por favor, informe um e-mail válido!"
    };
  }

  if (!validatePassword(values.password)) {
    errors.password = {
      message:
        "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
    };
  }

  return { errors };
};

const mapperError = (type) => {
  const possibleErrors = {
    signin: "Usuário inexistente ou senha inválida"
  };

  return possibleErrors[type] ?? "Erro Interno. Tente novamente mais tarde.";
};

module.exports = {
  validateForm,
  mapperError
};
