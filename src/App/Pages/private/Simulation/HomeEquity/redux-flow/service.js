import {
  setCalculatedFlowData,
  setError,
  setLoading,
  setSuccess
} from "./actions";

const config = { apiUrl: "https://api-portaldev.pontte.com.br" };
export const formatPrice = (value) => {
  const text = value ? value.replace(/[R$ .]/g, "").replace(",", ".") : 0;
  return text;
};

const checkForError = ({ error }) => {
  if (error) {
    throw new Error(error.message);
  }
};
const camelToSnake = (string) =>
  string.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();

export const saveSimulation = (values, dispatch) => {
  dispatch(setLoading());
  const data = {};
  
  Object.keys(values).map((key) => (data[camelToSnake(key)] = values[key]));

  fetch(`${config.apiUrl}/simulator/v1/calculator`, {
    method: "POST",
    body: JSON.stringify({ ...data })
  })
    .then((response) => {
      const r = response.json();
      console.log({ r });

      return r;
    })
    .then((response) => {
      console.log({ response });
      checkForError(response);

      dispatch(
        setCalculatedFlowData({
          ...response,
          loanValue: values.loanValue
        })
      );

      dispatch(setSuccess());
    })
    .catch((error) => {
      dispatch(setError());
      throw error;
    });
};
