import "./App.scss";
import { Route, Routes } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { routes } from "./routes";
import { DataStore } from "aws-amplify";
import { useCallback, useEffect } from "react"; // Import useEffect to trigger the function

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
