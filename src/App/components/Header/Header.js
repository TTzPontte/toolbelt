import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import { Button } from "react-bootstrap";
import Logo from "../Logo/Logo";
import { useAuth } from "../Auth";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleMenu = () => {
    setActiveMenu(true);
  };

  const auth = useAuth();

  const isLoggedIn = false;

  return (
    <div className="header">
      <div className="header-wrapper">
        <Link to="/">
          <Logo color="#5c3b6b" />
        </Link>

        <div>
          {!isLoggedIn && (
            <Button className="btn pp-hover-icon" role="button">
              <Link to="/orgs/home">
                {auth?.user?.isAuthenticated ? "Home" : "Login"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
