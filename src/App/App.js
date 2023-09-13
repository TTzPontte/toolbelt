import "./App.scss";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
// import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home/Home";
import Test from "./Pages/test/Test";
import New from "./Pages/New";
import Layout from "./components/Layout";
import SerasaCreditScoreSearch from "./Pages/Serasa/SerasaCreditScoreSearch";
import PrivateHome from "./Pages/private/Home";
import LoginPage from "./Pages/public/LoginPage";
// import { withAuthenticator } from "@aws-amplify/ui-react";

// Define your routes array
const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/PrivateHome",
        element: <PrivateHome />,
    },
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/new",
        element: <New />,
    },
    {
        path: "/serasa",
        element: <SerasaCreditScoreSearch />,
    },
    {
        path: "/serasa",
        element: <SerasaCreditScoreSearch />,
    },
    { path: "/login", element: <LoginPage /> },

];

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

// export default withAuthenticator(App);
export default App;
