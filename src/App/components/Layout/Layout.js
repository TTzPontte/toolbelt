import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import "./style.scss";
import { PrivateLayout, PublicLayout } from "./Layouts";

const Layout = () => {
  const location = useLocation();
  const privateRoutes = ["orgs","internal", "serasa"]
  const isPrivate =
    privateRoutes.includes(location.pathname.split("/")[1])

  return (
    <>
      {!isPrivate ? (
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      ) : (
        <PrivateLayout>
          <Outlet />
        </PrivateLayout>
      )}
    </>
  );
};

export default Layout;
