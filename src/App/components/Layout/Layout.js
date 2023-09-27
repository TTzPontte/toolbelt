import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import "./style.scss";
import { PrivateLayout, PublicLayout } from "./Layouts";
// import { ToastContainer, toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const location = useLocation();
  const privateRoutes = ["orgs","internal", "serasa"]
  const isPrivate =
    privateRoutes.includes(location.pathname.split("/")[1])

  return (
    <>
      {!isPrivate ? (
        <PublicLayout>
          <ToastContainer />

          <Outlet />
        </PublicLayout>
      ) : (
        <PrivateLayout>
          <ToastContainer />

          <Outlet />
        </PrivateLayout>
      )}
    </>
  );
};

export default Layout;
