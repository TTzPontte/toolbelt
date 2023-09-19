import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import LogoGoogle from "../../../images/icons/social/google.svg";
import {Auth} from "aws-amplify";

const loginGoogle = async () => {
  const config = Auth.configure();
  const { domain, redirectSignIn, responseType } = config.oauth;
  const clientId = config.userPoolWebClientId;

  const urlToGoogle = `https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}&identity_provider=Google`;

  window.location.assign(urlToGoogle);
};


const LoginComponent = ({ authState }) => {
  const onClickLogin = () => {
    console.log("logged in")
    loginGoogle();
  };

  return (
    <div className="login">
      <h2 className="login-title">Login - Torre de Controle</h2>
      <div className="login-content">
        <div className="login-content-btns">
          <a className="google-button" href="#" onClick={onClickLogin}>
            <span className="google-button__icon">
              <img src={LogoGoogle} alt="Google - Logo" />
            </span>
            <span className="google-button__text">Login com o Google</span>
          </a>
        </div>
        {/*{authState === AuthState.SIGN_IN_ERROR && (*/}
        {/*  <div className="login-error">*/}
        {/*    Seu usuário não é permitido fazer login nessa plataforma.*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  authState: PropTypes.string,
};
export default LoginComponent;
