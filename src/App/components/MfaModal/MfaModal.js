import React, { useState } from "react";
import {Form, Modal} from "react-bootstrap";
const User = {};
const MfaModal = (props) => {
  const [state, setState] = useState({
    resendDisabled: false,
    feedback: null
  });
  const onValidate = (values) => {
    const errors = {};

    if (values.code.length < 6) {
      errors.code = true;
    }

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { history, formValues, onSubmitCallback } = this.props;

    const runCallback = () => {
      if (typeof onSubmitCallback === "function") {
        onSubmitCallback(true);
        return true;
      }

      return false;
    };

    const { username } = formValues;

    setSubmitting(true);

    await User.confirm({
      username,
      code: values.code
    })
      .then(() => {
        if (!runCallback(true)) {
          history.push("/");
        }
      })
      .catch((err) => {
        setSubmitting(false);

        let feedback = null;

        // CodeMismatchException
        if (err.code == "CodeMismatchException") {
          feedback = "Código incorreto";
        }

        if (feedback) {
          clearTimeout(this.timerFeedback);

          this.setState({ feedback });

          this.timerFeedback = setTimeout(() => {
            feedback = null;

            this.setState({ feedback });
          }, 3000);
        }
      });
  };

  const resend = async () => {
    const { formValues } = props;

    this.setState({
      resendDisabled: true
    });

    await User.resend(formValues.username).then(() => {
      this.setState({
        feedback: "Enviamos um novo código para você, confira no seu e-mail."
      });

      setTimeout(() => {
        this.setState({
          resendDisabled: false,
          feedback: null
        });
      }, 3000);
    });
  };

  const { active, handleClose, formValues } = props;
  const { feedback, resendDisabled } = state;

  const wrapHandleClose = () => handleClose(formValues.username);

  return (
    <div>
      <Modal
        active={active}
        size="medium"
        theme="dark"
        handleClose={wrapHandleClose}
        showCloseButton
        ref="modal"
      >
        <header className="modal-header">
          <h1 className="modal-header__title">
            Digite o código de confirmação
          </h1>
          <div className="modal-header-text">
            <p>
              Enviamos um código de 6 dígitos para o seu e-mail, digite aqui
              para prosseguir com o cadastro.
            </p>
          </div>
        </header>

        <Form
          initialValues={{
            code: ""
          }}
          validate={this.onValidate}
          onSubmit={this.onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            setFieldValue,
            isSubmitting
          }) => (
            <form
              onSubmit={handleSubmit}
              className="modal-form modal-form--user-not-confirmed"
            >
              <label
                htmlFor="code"
                className={
                  errors.code && touched.code
                    ? "modal-form-group modal-form-group--code error"
                    : "modal-form-group modal-form-group--code"
                }
              >
                <input
                  type="number"
                  id="code"
                  name="code"
                  className="modal-form__input"
                  onChange={(event) => {
                    const target = event.currentTarget;
                    let { value } = target;
                    const $submitButton = document.querySelector(
                      ".modal-form--user-not-confirmed .modal-form-buttons__btn--submit"
                    );

                    if (value.length > 6) {
                      value = value.slice(0, 6);
                      target.blur();
                      $submitButton.focus();
                    }

                    if (value.length >= 6) {
                      target.blur();
                      $submitButton.focus();
                    }

                    setFieldValue("code", value);
                  }}
                  onBlur={handleBlur}
                  value={values.code}
                />
              </label>

              {feedback && <p className="modal-form__feedback">{feedback}</p>}

              <footer className="modal-form-footer">
                <div className="modal-form-sendcode">
                  <button
                    type="button"
                    className="modal-form-sendcode__btn"
                    disabled={resendDisabled}
                    onClick={this.resend.bind(this)}
                  >
                    <span>Enviar um novo código</span>
                  </button>
                </div>

                <div className="modal-form-buttons">
                  <button
                    type="button"
                    className="modal-form-buttons__btn btn btn--gray"
                    onClick={wrapHandleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="modal-form-buttons__btn modal-form-buttons__btn--submit btn btn--white btn--full"
                  >
                    Confirmar
                  </button>
                </div>
              </footer>
            </form>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MfaModal;
