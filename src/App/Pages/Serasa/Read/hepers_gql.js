import {API, Auth, Storage} from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { DataStore } from "@aws-amplify/datastore";
import {EntityType, ReportStatus, SerasaPartnerReport, SerasaReport} from "../../../../models";
import {createSerasaPartnerReport, createSerasaReport, updateSerasaReport} from "../../../../graphql/mutations";
import {getSerasaPartnerReport, getSerasaReport} from "../../../../graphql/queries";

export const personTypeOptions = [
  { label: "PF", value: "PF" },
  { label: "PJ", value: "PJ" }
];

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

export const createReport = async (payload) => {
    const item = await API.graphql({
        query: createSerasaReport,
        variables: {
            input: {
                documentNumber: payload.numDocument,
                pipefyId: payload.idPipefy,
                type: "PF", // You can set the type as needed
                status: "PROCESSING" // Set the initial status
            }
        }
    });
    console.log({ item });
    return item.data.createSerasaReport;
};

export const createPartnerReport = async (payload) => {
    const item = await API.graphql({
        query: createSerasaPartnerReport,
        variables: {
            input: {
                documentNumber: payload.numDocument,
                pipefyId: payload.idPipefy,
                type: "PF", // You can set the type as needed
                status: "PROCESSING", // Set the initial status
                serasaReportID: payload.hoastId // Assuming this is the relationship field
            }
        }
    });
    console.log({ item });
    return item.data.createSerasaPartnerReport;
};

export const updateReport = async (id, status) => {
    const item = await API.graphql({
        query: updateSerasaReport,
        variables: {
            input: {
                id: id,
                status: status // Update the status
            }
        }
    });
    return item.data.updateSerasaReport;
};


export const getReportById = async (id) => {
    try {
        // Get a specific item
        const oneSerasaReport = await API.graphql({
            query: getSerasaReport,
            variables: { id: id }
        });
        return oneSerasaReport
    } catch (error) {
        console.error("Error fetching report by ID:", error);
        throw error;
    }
};

export const uploadToStorage = async (data, reportId, fileName) => {
  const filePath = `serasa/${reportId}.json`;
  const file = await Storage.put(filePath, JSON.stringify(data), {
    level: "public" // specify the access level here
  });
  console.log({ file });
};
