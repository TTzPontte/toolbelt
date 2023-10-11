import { API, Auth, Storage } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import {
  getSerasaPartnerReport,
  getSerasaReport
} from "../../../../graphql/queries";

export const getEnvironment = () =>
  window.location.hostname === "localhost" ? "dev" : "prod";

export const invokeLambda = async (functionName, payload) => {
  const credentials = await Auth.currentCredentials();
  const lambda = new Lambda({ region: "us-east-1", credentials });

  return lambda
    .invoke({
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    })
    .promise();
};


export const getReportById = async (id) => {
  try {
    // Get a specific item
    const oneSerasaReport = await API.graphql({
      query: getSerasaReport,
      variables: { id: id }
    });
    return oneSerasaReport;
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
};
export const getPartnerReportById = async (id) => {
  try {
    // Get a specific item
    const oneSerasaReport = await API.graphql({
      query: getSerasaPartnerReport,
      variables: { id: id }
    });
    return oneSerasaReport;
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
};

// const getItem = async (id) => {
//   try {
//     let serasaData;
//
//     // Attempt to get the main SerasaReport
//     const mainReport = await getReportById(id);
//     serasaData = mainReport?.data?.getSerasaReport?.data;
//
//     // If the main SerasaReport is not available, try to get the partner report
//     if (!serasaData) {
//       const partnerReport = await getPartnerReportById(id);
//       serasaData = partnerReport?.data?.getSerasaReport?.data;
//     }
//
//     // If neither report is available, log an error and return null
//     if (!serasaData) {
//       console.error("SerasaReport not found for ID:", id);
//       return null;
//     }
//
//     // Construct the new object
//     const newObj = {
//       ...serasaData,
//       serasaPartnerReports: serasaData.SerasaPartnerReports?.items || []
//     };
//
//     console.log({ newObj });
//     return newObj;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export const getItem = async (id) => {
  try {
    const {
      data: { getSerasaReport: data }
    } = await getReportById(id);
    console.log({ data });
    if (!data) {
      console.error("SerasaReport not found for ID:", id);
      return null; // Return null if not found
    }

    const newObj = {
      ...data,
      serasaPartnerReports: data?.SerasaPartnerReports?.items
    };
    console.log({ newObj });
    return newObj;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const fetchJson = async (id) => {
  const result = await Storage.get(`serasa/${id}.json`, {
    download: true,
    level: "public"
  });

  const blob = result.Body;
  const text = await blob.text();
  const jsonContent = JSON.parse(text);
  return jsonContent;
};
export const fetchReport = async (id) => {
  const fileKey = `serasa/${id}.json`;
  const response = await Storage.get(fileKey, {
    download: true,
    level: "public",
    validateObjectExistence: true
  });
  const jsonContent = JSON.parse(await response.Body.text());
  return jsonContent;
};
