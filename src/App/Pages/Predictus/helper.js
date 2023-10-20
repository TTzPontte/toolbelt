import { Auth, Storage } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";

export const getEnvironment = () =>
  window.location.hostname === "localhost" ? "dev" : "prod";


export const personTypeOptions = [
  { label: "PF", value: "PF" },
  { label: "PJ", value: "PJ" }
];

export const LAMBDA_FUNCTION_NAME =
  "toolbelt3Predictus-ToolbeltPredictus-nQCMgHG9Y238";
export const environment = "staging";
const environmentName = process.env.REACT_APP_ENV || process.env.AMPLIFY_ENV;
console.log(`Current environment: ${environmentName}`);
console.log(process.env)

export const invokeLambda = async (documentNumber) => {
  try {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: "us-east-1", credentials });
    const response = await lambda
      .invoke({
        FunctionName: LAMBDA_FUNCTION_NAME,
        Payload: JSON.stringify({ documentNumber, environment })
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
    const fileKey = `predictus/${fileName}.xlsx`;
    console.log({ fileKey });
    const signedUrl = await Storage.get(fileKey, {
      level: "public",
      download: false
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
