import { useReducer, useState } from "react";

const initialState = {
  loading: true,
  success: false,
  error: false,
  formValues: undefined,
  calculatedFlow: undefined
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, ERROR: false, success: true };
    case "SUCCESS":
      return { ...state, loading: false, ERROR: false, success: true };
    case "ERROR":
      return { ...state, loading: false, ERROR: true, success: false };
    case "UPDATE_FORM_VALUES":
      return {
        ...state,
        loading: false,
        ERROR: false,
        success: false,
        formValues: action.payload
      };
    case "SET_CALCULATED_FLOW_DATA":
      return {
        ...state,
        loading: false,
        ERROR: false,
        success: false,
        calculatedFlow: action.payload
      };
    default:
      throw new Error();
  }
};

const StateProvider = ({ initState = true, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = (action) => dispatch(action);
  console.log({ state });
  const [show, setShow] = useState(state);
  const toogleShowNav = () => {
    console.log(`click      ${show}    clak`);
    console.log("click clak");
    setShow(!show);
  };
  return children({ ...{ state, setState } });
};
export default StateProvider;
