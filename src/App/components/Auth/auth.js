import { Auth } from "aws-amplify";

/**
 * This represents some generic auth provider API, like Firebase.
 */
// const signin = async (callback) => {
//   console.log({ callback });
//   const { email: username, password } = userInfo;
//   console.log({ userInfo });
//   fakeAuthProvider.isAuthenticated = true;
//   callback();
//   try {
//     const { user } = await Auth.signIn(username, password);
//     await callback.action();
//   } catch (error) {
//     console.log("error signing in", error);
//   }
// };
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    callback();
    fakeAuthProvider.isAuthenticated = false;
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

export { fakeAuthProvider };
