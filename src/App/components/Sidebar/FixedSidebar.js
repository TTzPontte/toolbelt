import useWindowSize from "../Hooks/usewindowSize";
import { Col, Row } from "react-bootstrap";
import Logo from "../Logo/Logo";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth";

const Info = ({ name, fa }) => (
  <>
    <i className={`fas fa-fw fa-${fa}`} />
    <span>{name}</span>
  </>
);

function getPartnerFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("organizationId") || "";
}

const NavItemLink = ({ name, link, fa = "", active = "" }) => {
  const isthirdPartyLink = link.includes("https://");
  console.log({ isthirdPartyLink });

  const ThirdPartyLink = ({ name, fa, link }) => (
    <a
      className="nav-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Info {...{ name, fa }} />
    </a>
  );
  const InternalLink = ({ link, name, fa }) => (
    <Link className="nav-link " to={link}>
      <Info {...{ name, fa }} />
    </Link>
  );
  return (
    <li className={`nav-item  ${active}`}>
      <Row className="w-100">
        <Col>
          {!fa && <i className={fa} />}
          {isthirdPartyLink ? (
            <ThirdPartyLink {...{ name, fa, link }} />
          ) : (
            <InternalLink {...{ name, fa, link }} />
          )}
        </Col>
      </Row>
    </li>
  );
};

const Divider = ({ clsx = "" }) => <hr className={`sidebar-divider ${clsx}`} />;

const navlinks = [
  {
    links: [
      {
        link: "/orgs/home",
        name: "Home",
        fa: "home"
      }
    ]
  },
  {
    title: "Simulação",
    links: [
      {
        link: "/orgs/simulation/HE",
        name: "Simulação H.E.",
        fa: "landmark",
        clsx: "my-0"
      },
      {
        link: "/orgs/simulation/FI",
        name: "Simulação Finan.",
        fa: "hand-holding-usd"
      }
    ]
  },
  {
    title: "Cadastro",
    links: [
      {
        link: "/orgs/leads/HomeEquity",
        name: "Home Equity",
        fa: "landmark",
        clsx: "my-0"
      },
      {
        link: "/orgs/leads/Financing",
        name: "Financiamento",
        fa: "hand-holding-usd"
      }
    ]
  },
  {
    title: "Biblioteca",
    links: [
      {
        link: "/orgs/blog/material-apoio",
        name: "Materiais de Apoio",
        fa: "building",
        clsx: "my-0"
      },
      {
        link: "https://app.pipefy.com/request-tracker/",
        name: "Status das operações",
        fa: "address-card"
      }
    ]
  }
];

const Menu = () => {
  const pathParameters = getPartnerFromUrl();

  if (pathParameters) {
    navlinks.push({
      title: "Usuário",
      links: [
        {
          link: "/orgs/users/invite",
          name: "Convite",
          fa: "user-plus"
        }
      ]
    });
  }


  Menu.Section = ({ title, links }) => (
    <>
      <div className="sidebar-heading  my-0">{title}</div>
      {links.map((i) => (
        <NavItemLink {...i} />
      ))}
      <Divider />
    </>
  );

  return (
    <>
      {navlinks.map((navlink) => (
        <Menu.Section {...navlink} />
      ))}
    </>
  );
};

const FixedSidebar = ({ toogled, setState, fixed, offCanvas }) => {
  const [width, height] = useWindowSize();
  const collapsed = width <= 480 ? " collapse" : "";
  console.log({ collapsed });
  const toogleActions = () => ({
    type: toogled ? "fixed_toogled_close" : "fixed_toogled_open"
  });

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-light accordion ${
          toogled ? "toggled " : ""
        }`}
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <Row className="sidebar-brand-icon">
            <Col>
              <Logo color="#5c3b6b" toggled={toogled} />
            </Col>
          </Row>
        </a>
        <Divider clsx="my-0" />
        <Menu />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={() => setState(toogleActions())}
          />
        </div>
      </ul>
    </>
  );
};
export default FixedSidebar;
