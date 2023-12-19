import {Auth, Storage} from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import env from "../../../config/env";

export const getEnvironment = () => window.location.hostname === "localhost" ? "dev" : "prod";


export const personTypeOptions = [{label: "PF", value: "PF"}, {label: "PJ", value: "PJ"}];

export const LAMBDA_FUNCTION_NAME = env.PREDICTUS_REPORT_LAMBDA

function determineEnvironment() {
    const hostname = window.location.hostname;

    if (hostname.includes("ferramentas") && !hostname.includes("playground")) {
        return "prod";
    }
    return "staging"; // Default to staging for all other cases
}

// To use


export const invokeLambda = async (reportId) => {
    try {
        const credentials = await Auth.currentCredentials();
        const lambda = new Lambda({region: "us-east-1", credentials});
        const response = await lambda
            .invoke({
                FunctionName: LAMBDA_FUNCTION_NAME,
                Payload: JSON.stringify({reportId, environment: determineEnvironment()})
            })
            .promise();

        return JSON.parse(response.Payload);
    } catch (error) {
        console.error("Error invoking lambda:", error);
        throw error;
    }
};

export const downloadFromS3 = async (fileName) => {
    try {
        const fileKey = `predictus/${fileName}`;
        console.log({fileKey});
        const signedUrl = await Storage.get(fileKey, {
            level: "public", download: false
        });
        return signedUrl;
    } catch (error) {
        console.error(`Failed to download ${fileName} from S3:`, error);
        throw error;
    }
};

export const initiateFileDownload = (url, fileName) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
