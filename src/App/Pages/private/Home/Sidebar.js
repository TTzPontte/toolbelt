import React, { useReducer } from "react";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "enable":
      return { activeSidebar: true };
    case "disable":
      return { activeSidebar: false };
    default:
      throw new Error();
  }
};
const initialState = { activeSidebar: true };

export const Toogler = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toogleNav = () => {
    const { activeSidebar } = state;
    if (activeSidebar) {
      dispatch("disable");
      console.log("disable");
    } else {
      dispatch("enable");
    }
  };
  return (
    <>
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3 toogled"
        onClick={toogleNav}
      >
        BAZRS
        <i className="fa fa-bars" />
      </button>
    </>
  );
};
const Sidebar = ({ toogle_clsx = "" }) => {
  // const [navState, setNavState] = useState(!!toogle_clsx);
  // const [state, dispatch] = useReducer(reducer, {activeSidebar: !!toogle_clsx} );
  const [state, dispatch] = useReducer(reducer, initialState);
  const toogleNav = () => {
    const { activeSidebar } = state;
    if (!!activeSidebar) {
      dispatch("disable");
      console.log("disable");
    } else {
      dispatch("enable");
    }
  };

  const actions = {
    enable: () => dispatch({ type: "enable" }),
    disable: () => dispatch({ type: "disable" })
  };
  console.log({ state });
  const { activeSidebar } = state;
  const clsx = activeSidebar ? " " : " collapse";
  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${clsx}`}
        iwd="accordionSidebar"
      >
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
              <h6 className="collapse-header">Custom Components:</h6>
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

        <NavItemLink link={"/simulation/HE"} name={"Simulação H.E."} />
        <NavItemLink link={"/simulation/FI"} name={"Simulação Finan."} />
        <NavItemLink link={"/leads/New"} name={"Cadastro Novo Cliente"} />

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Admnistrador</div>

        <NavItemLink link={"/protected"} name={"Organização"} />
        <NavItemLink link={"/members"} name={"Consultores"} />

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={() => toogleNav()}
          />
        </div>
      </ul>
    </>
  );
};
export default Sidebar;
