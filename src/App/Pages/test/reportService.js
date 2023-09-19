// Import any necessary dependencies
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { DataStore } from "@aws-amplify/datastore";
import { EntityType, ReportStatus, SerasaReport } from "../../../models";

// Function to get the environment based on the hostname
export function getEnvironment() {
    return window.location.hostname === "localhost" ? "dev" : "prod";
}

// Function to invoke a Lambda function with authentication
export async function invokeLambda(functionName, payload) {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: "us-east-1", credentials });

    return lambda
        .invoke({
            FunctionName: functionName,
            Payload: JSON.stringify(payload)
        })
        .promise();
}

// Function to create a Serasa report entry in DataStore
export async function createReport(payload) {
    const item = await DataStore.save(
        new SerasaReport({
            documentNumber: payload.numDocument,
            pipefyId: payload.idPipefy,
            type: EntityType.PF, // You may need to adjust this based on your logic
            status: ReportStatus.PROCESSING
        })
    );
    return item;
}

// Function to update a Serasa report status in DataStore
export async function updateReport(id, status) {
    const original = await DataStore.query(SerasaReport, id);
    const updateReport = await DataStore.save(
        SerasaReport.copyOf(original, (updated) => {
            updated.status = status;
        })
    );
    return updateReport;
}
// You can add more service functions here, such as functions for PDF generation and data formatting
