import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import "./style.scss";
import { PrivateLayout, PublicLayout } from "./Layouts";

const Layout = () => {
  const location = useLocation();

  const isPrivate =
    location.pathname.split("/")[1] === "orgs" ||
    location.pathname.split("/")[1] === "internal";

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
