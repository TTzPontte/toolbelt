/* eslint-disable no-useless-escape */

const validateForm = (values) => {
  const validateEmail = (value) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };

  const errors = {};

  if (!validateEmail(values.email)) {
    errors.email = {
      message: "Por favor, informe um e-mail válido!"
    };
  }

  return { errors };
};


module.exports = {
  validateForm,
};