import React from "react";
import NavProvider from "./NavProvider";
import useWindowSize from "../Hooks/usewindowSize";
import { Col, Offcanvas, Row } from "react-bootstrap";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import navItemLink from "../NavItemLink";

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

const NavItemLink = ({  name, link, fa = "", active = "" }) => {
  const isthirdPartyLink = link.includes("https://");
  // console.log({ isthirdPartyLink });

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
    title: "Serasa",
    links: [
      {
        link: "/serasa/new",
        name: "Nova Consulta",
        fa: "landmark",
        clsx: "my-0"
      },
      {
        link: "/serasa",
        name: "Relatórios",
        fa: "hand-holding-usd"
      }
    ]
  },
  {
    title: "Predictus",
    links: [
      {
        link: "/predictus/new",
        name: "Nova Consulta",
        fa: "landmark",
        clsx: "my-0"
      },
      {
        link: "/predictus",
        name: "Relatórios",
        fa: "hand-holding-usd"
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
        <NavItemLink key={i?.name} {...i} />
      ))}
      <Divider />
    </>
  );

  return (
    <>
      {navlinks.map((navlink, index) => (
        <Menu.Section key={`$link${index}`} {...navlink} />
      ))}
    </>
  );
};

const FixedSidebar = ({ toogled, setState, fixed, offCanvas }) => {
  const [width, height] = useWindowSize();
  const collapsed = width <= 480 ? " collapse" : "";
  // console.log({ collapsed });
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

const OffcanvasSidebar = ({ openned = false }) => {
  return (
    <>
      <NavProvider state={openned}>
        {({ show, setShow }) => (
          <>
            {show && (
              <Offcanvas
                className={
                  "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                }
                show={show}
                onHide={() => setShow(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    {" "}
                    <a
                      className="sidebar-brand d-flex align-items-center justify-content-center"
                      href="index.html"
                    >
                      <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                      </div>
                      <div className="sidebar-brand-text mx-3">
                        Parceiro <sup> Porttal </sup>
                      </div>
                    </a>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ul
                    className={
                      "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                    }
                  >
                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                      <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                      </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Acompanhamento</div>
                    <NavItemLink link={"/Clientes"} name={"leads"} />
                    <li className="nav-item">
                      <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                      </a>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionSidebar"
                      >
                        <div className="bg-white py-2 collapse-inner rounded">
                          <h6 className="collapse-header">
                            Custom Components:
                          </h6>
                          <a className="collapse-item" href="buttons.html">
                            Buttons
                          </a>
                          <a className="collapse-item" href="cards.html">
                            Cards
                          </a>
                        </div>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Ferramentas</div>

                    <NavItemLink
                      link={"/simulation/HE"}
                      name={"Simulação H.E."}
                    />
                    <NavItemLink
                      link={"/simulation/FI"}
                      name={"Simulação Finan."}
                    />
                    <NavItemLink
                      link={"/leads/New"}
                      name={"Cadastro Novo Cliente"}
                    />

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Admnistrador</div>

                    <NavItemLink link={"/protected"} name={"Organização"} />
                    <NavItemLink link={"/members"} name={"Consultores"} />

                    <hr className="sidebar-divider d-none d-md-block" />

                    <div className="text-center d-none d-md-inline">
                      <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                      />
                    </div>
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            )}
          </>
        )}
      </NavProvider>
    </>
  );
};

export const Sidebar = (props) => {
  return (
    <>
      <section style={{ paddingBottom: "1.5em" }}>
        <NavProvider>
          {({
            show,
            state,
            state: { fixed, offCanvas, toogled },
            setState
          }) => (
            <>
              {fixed && <FixedSidebar {...{ ...state, setState }} />}
              {!fixed && offCanvas && <OffcanvasSidebar openned={show} />}
            </>
          )}
        </NavProvider>
      </section>
    </>
  );
};
