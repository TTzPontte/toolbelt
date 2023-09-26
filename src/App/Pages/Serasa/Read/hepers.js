import { Auth, Storage } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { DataStore } from "@aws-amplify/datastore";
import {EntityType, ReportStatus, SerasaPartnerReport, SerasaReport} from "../../../../models";
export const getItem = async (id) => {
  const getAssociatedPartnerReports = async (serasaReportId) => {
    try {
      return await DataStore.query(SerasaPartnerReport, (report) =>
          report.serasareportID.eq(serasaReportId)
      );
    } catch (error) {
      console.error("Error fetching associated SerasaPartnerReports:", error);
      throw error;
    }
  };

  try {
    const serasaReport = await DataStore.query(SerasaReport, id);
    if (!serasaReport) {
      console.error("SerasaReport not found for ID:", id);
      return null; // Return null if not found
    }

    const partnerReports = await getAssociatedPartnerReports(id);

    return { ...serasaReport, serasaPartnerReports: partnerReports };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

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

export const updateReport = async (id, status) => {
  const original = await DataStore.query(SerasaReport, id);
  const updatedReport = await DataStore.save(
    SerasaReport.copyOf(original, (updated) => {
      updated.status = status;
    })
  );
  return updatedReport;
};
export const uploadToStorage = async (data, reportId, fileName) => {
  const filePath = `serasa/${reportId}.json`;
  const file = await Storage.put(filePath, JSON.stringify(data), {
    level: "public" // specify the access level here
  });
  console.log({ file });
};
