import React from "react";
import OffcanvasSidebar from "../../pages/private/Home/OffcanvasSidebar/OffcanvasSidebar";
import FixedSidebar from "./FixedSidebar";
import NavProvider from "./NavProvider";

export const Sidebar = (props) => {
  return (
    <>
      <section style={{ paddingBottom: "1.5em"}}>
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
