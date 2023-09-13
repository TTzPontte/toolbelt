import Auth from "@aws-amplify/autdh";
import AwsConfig from "javascripts/helpers/aws-config";

Auth.configure(AwsConfig);

const checkSession = () => Auth.currentSession();

const login = (data, success, error) => Auth.signIn(data);

const logout = async () => {
  await Auth.signOut();
};

const register = ({ cpf, phone, values, origin, validationData }) => {
  const validationDataObject = {};
  if (Array.isArray(validationData)) {
    Object.assign(
      validationDataObject,
      validationData.reduce(
        (acc, { Name, Value }) => ({ ...acc, [Name]: Value }),
        {}
      )
    );
  } else {
    Object.assign(validationDataObject, validationData);
  }

  return Auth.signUp({
    username: values.email,
    password: values.password,
    referrer: origin,
    attributes: {
      "custom:cpf": cpf,
      name: values.fullname,
      nickname: values.nickname,
      phone_number: phone
    },
    validationData: validationDataObject
  });
};

const confirm = async (values) => {
  await Auth.confirmSignUp(values.username, values.code);
};

const resend = async (username) => {
  await Auth.resendSignUp(username);
};

const forgotPassword = async (username) => {
  await Auth.forgotPassword(username);
};

const forgotPasswordCode = async (values) => {
  await Auth.forgotPasswordSubmit(
    values.username,
    values.code,
    values.newPassword
  );
};

const changePassword = async ({ values }) => {
  const user = await Auth.currentAuthenticatedUser();
  return Auth.changePassword(user, values.password, values.newPassword);
};

const completeNewPassword = async (user, newPassword) =>
  Auth.completeNewPassword(user, newPassword);

const User = {
  checkSession,
  login,
  logout,
  register,
  confirm,
  resend,
  forgotPassword,
  forgotPasswordCode,
  changePassword,
  completeNewPassword
};

export default User;
