import "./App.scss";
import {Route, Routes} from "react-router-dom";
// import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import {withAuthenticator} from "@aws-amplify/ui-react";
import {routes} from "./routes";

function App(props) {

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
// export default App;
