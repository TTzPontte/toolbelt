import React from "react";
import { Col, NavDropdown, Row } from "react-bootstrap";
import undraw_profile from "../../../images/undraw_profile.svg";
import { Auth } from "aws-amplify";
import { LogOutButton } from "../../../ui-components";

// Define the logout function
const logout = async () => {
  try {
    await Auth.signOut();
    // Optionally, you can redirect the user to a logout success page or perform other actions.
    // For example, you can use React Router to navigate to a different page.
    // history.push('/logout-success');
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// ProfileDropdown component
const ProfileDropdown = ({ onLogout }) => (
  <NavDropdown
    title={
      <img
        className="img-profile rounded-circle"
        src={undraw_profile}
        alt="User Profile"
      />
    }
    id="profile-dropdown"
  >
    <NavDropdown.Item onClick={onLogout}>
      <LogOutButton width={"auto"} shrink={3} />
      {/*<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" /> Logout*/}
    </NavDropdown.Item>
  </NavDropdown>
);

// TopNavbar component
const TopNavbar = ({ onLogout }) => (
  <nav
    className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
    style={{ zIndex: 1 }}
  >
    <Row className="w-100 d-flex justify-content-end">
      <Col className="d-flex justify-content-end">
        <ProfileDropdown onLogout={onLogout} />
      </Col>
    </Row>
  </nav>
);

export default TopNavbar;
