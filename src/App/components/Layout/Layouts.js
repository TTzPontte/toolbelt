import Header from "../Header";
import { Container } from "react-bootstrap";
import { Sidebar } from "../Sidebar/Sidebar";
import TopNavbar from "../TopNavbar/TopNavbar";
import { AuthContext, RequireAuth, useAuth } from "../Auth";
import { Outlet } from "react-router-dom";
import * as React from "react";
import "./style.scss";
import Footer from "../Footer/Fotter";

const PublicLayout = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
  </>
);
const PrivateLayout = ({ children }) => (
  <>
    <RequireAuth>
      <div className="Layout-wrapper f-row">
        <Sidebar />
        <div
          className="Layout-content-wrapper d-flex flex-column w-100"
          style={{ height: "100%" }}
        >
          <div className="Layout-content">
            <AuthContext.Consumer>
              {(value) => <TopNavbar currentUser={value.user} />}
            </AuthContext.Consumer>
            <div style={{ height: "100%", width: "100%" }}>{children}</div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </RequireAuth>
  </>
);

export { PublicLayout, PrivateLayout };
