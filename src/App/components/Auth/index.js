import React from "react";
import { AuthProvider as OauthProvider } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext, useAuth } from "./useAuth";

const AuthProvider = ({ children }) => (
  <OauthProvider AuthContext={AuthContext}>{children}</OauthProvider>
);

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
console.log({auth})

  // if (!auth.user.isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;

  return children;
};
export { AuthContext, useAuth } from "./useAuth";

// const module = { AuthContext, AuthProvider: OauthProvider, RequireAuth, useAuth };
export  {
  // AuthContext,
  AuthProvider,
  RequireAuth,
  // useAuth
};
