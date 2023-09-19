import React from "react";
import { Link } from "react-router-dom";

const NavItemLink = ({ name, link }) => (
  <li className="nav-item">
    <Link className="nav-link" to={link}>
      <span>{name}</span>
    </Link>
  </li>
);

export default NavItemLink;