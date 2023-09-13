/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback) {
        callback()
        fakeAuthProvider.isAuthenticated = true;
    },
    signout(callback) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

export { fakeAuthProvider };
