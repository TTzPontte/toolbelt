//todo swith to canAccess
// ex: canAccess({ policy: 'financing:all:read' })(NavLink);

import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Menu = memo((props) => {
  const navigate = useNavigate();

  const handleSelect = (selectedKey) => navigate(selectedKey);

  return (
    <Nav
      defaultActiveKey="/"
      as="ul"
      className="header-nav-items"
      activeKey="/"
      onSelect={handleSelect}
    >
      <Nav.Item as="li">
        <Nav.Link href="/">Public Page</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="/protected">Protected Page </Nav.Link>
      </Nav.Item>
    </Nav>
  );
});

export default Menu;
