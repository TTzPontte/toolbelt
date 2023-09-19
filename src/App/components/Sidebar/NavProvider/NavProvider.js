import { useReducer, useState } from "react";

const initialState = {
  fixed: true,
  offCanvas: false,
  toogled: false
};
const reducer = (state, action) => {
  switch (action.type) {
    case "offCanvas":
      return { fixed: false, toogled: false, offCanvas: true };
    case "fixed_toogled_open":
      return { fixed: true, toogled: true, offCanvas: false };
    case "fixed_toogled_close":
      return { fixed: true, toogled: false, offCanvas: false };
    default:
      throw new Error();
  }
};

const NavProvider = ({ initState = true, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = (action) => dispatch(action);
  const [show, setShow] = useState(state);
  const toogleShowNav = () => setShow(!show);

  return children({ ...{ show, setShow, toogleShowNav, state, setState } });
};
export default NavProvider;
