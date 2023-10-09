import "./App.scss";
import { Route, Routes } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { routes } from "./routes";
import { useCallback, useEffect } from "react"; // Import useEffect to trigger the function
import { Amplify, AuthModeStrategyType, DataStore } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure({
  ...awsExports,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
});

function App(props) {
  const startDataStore = useCallback(async () => {
    await DataStore.start();
  }, []);

  // Use useEffect to trigger the function when the component mounts
  useEffect(() => {
    startDataStore();
  }, [startDataStore]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default withAuthenticator(App);
