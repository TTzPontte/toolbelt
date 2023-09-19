import React from "react";
import { fakeAuthProvider } from "../../auth";
import { Auth } from "aws-amplify";
import AwsConfig from "../../../aws-exports.js";

Auth.configure(AwsConfig);

export const AuthProvider = ({ AuthContext, children }) => {
  let [user, setUser] = React.useState({
    username: "",
    password: "",
    email:"",
    isAuthenticated: false
  });

  const [error, setError] = React.useState(null);

  const signup = async (userInfo, callback) => {
    const { email: username, password, organizationId } = userInfo;

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          "custom:organizationId": organizationId
        }
      });

      setUser({ ...user, isAuthenticated: false });

      callback();
      return;
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  let signin = (newUser, callback) => {
    return new Promise((resolve, reject) => {
      fakeAuthProvider.signin(async () => {
        const { email: username, password } = newUser;

        try {
          const user = await Auth.signIn(username, password);

          if (!user) new Error();

          const { attributes } = await Auth.currentUserInfo();

          setUser({ ...attributes, isAuthenticated: true });

          callback();
          resolve();
        } catch (error) {
          setError({ type: "signin", code: error.code });
          reject();
          console.log("error signing in", { error });
        }
      });
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let confirmSignup = async (userInfo, callback) => {
    const { username, code } = userInfo;
    const confirm = await Auth.confirmSignUp(username, code);
    callback();
    return confirm;
  };

  let resendCode = (userInfo, callback) => {
    const { username } = userInfo;
    const resend = Auth.resendSignUp(username);
    callback();
    return resend;
  };

  const getCurrentSession = async () => {
    try {
      const session = await Auth.currentSession();

      const { attributes } = await Auth.currentUserInfo();

      if (session) {
        setUser({ ...attributes, isAuthenticated: true });
        return session;
      }
    } catch (err) {
      console.log("error session in", { err });
    }
  };

  let value = {
    user,
    error,
    signin,
    signout,
    signup,
    confirmSignup,
    resendCode,
    getCurrentSession
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// export default AuthProvider;
