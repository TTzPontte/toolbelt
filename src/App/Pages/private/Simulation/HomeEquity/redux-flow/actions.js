export const setLoading = () => ({ type: "LOADING" });
export const setError = () => ({ type: "ERROR" });
export const setSuccess = () => ({ type: "SUCCESS" });
export const setCalculatedFlowData = (payload) => ({
  type: "SET_CALCULATED_FLOW_DATA",
  payload
});
