import React, { useState } from "react";
import "./styles.scss";
// import { render } from 'react-dom';
// import { Avatar } from 'pipestyle';
// import 'pipestyle/assets/sidebar.css';



const CustomSidebar = ({setActiveMenu, openedSidebar = false}) => {
  const [isActive, setIsActive] = useState(openedSidebar);
  const toggleSidebar = () => {
    setIsActive(!isActive);
    setActiveMenu(!openedSidebar)
  };

  return (
    <>
      {/*<button className="pp-btn pp-btn-primary pp-btn-md" type="button">*/}
      {/*  Toggle Sidebar*/}
      {/*</button>*/}
      <aside className="pp-sidebar pp-active" aria-hidden="false">
        <header className="pp-flex-space-between">
          <h2 className="pp-sidebar-title">
            <a className="pp-ico-left pp-anchor pp-anchor-gray" href="#"></a>A
            sidebar title
          </h2>
          <button
            className="pp-btn pp-btn-icon pp-btn-icon-md pp-btn-round"
            type="button"
            onClick={toggleSidebar}
          >
            <div
              data-testid="interface-icon-close-big-sm"
              className="pp-icon pp-icon-sm"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="injected-svg"
                  data-src="https://pipestyle.staticpipefy.com/icons/interface/close-big-sm.svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    d="M12.838 3.949a.556.556 0 0 0-.786-.786L8 7.214l-.394-.392-3.659-3.659a.55.55 0 0 0-.785 0 .556.556 0 0 0 0 .786l3.659 3.659.393.392-4.052 4.052a.556.556 0 0 0 .785.786l4.053-4.052 4.052 4.052a.553.553 0 0 0 .784 0 .556.556 0 0 0 0-.786L8.786 8l.393-.392 3.66-3.66Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </button>
        </header>
        <div className="pp-sidebar-content">
          <div className="pp-sidebar-description">
            <strong>
              Sidebar description title
              <a
                className="pp-tooltip pp-tooltip-left pp-anchor pp-anchor-gray"
                href="#"
                data-title="Click here to dismiss"
              >
                <span className="pp-ico-close"></span>
              </a>
            </strong>
            <p>Sidebar description text</p>
          </div>
          <button
            className="SidebarItemStyled-lec10c-0 lcYOIj pp-anchor pp-anchor-gray"
            id="1"
            type="button"
          >
            <span>
              <strong></strong>
            </span>
          </button>
        </div>
        <footer>
          <button
            title="Sidebar action"
            className="pp-btn pp-btn-outline pp-btn-md pp-display-block"
            type="button"
          >
            Sidebar action
          </button>
        </footer>
      </aside>
    </>
  );
};

export default CustomSidebar;
