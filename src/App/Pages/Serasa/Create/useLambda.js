import { useState } from "react";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";

const getEnvironment = () => (window.location.hostname === "localhost" ? "dev" : "prod");

const useLambda = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const invokeLambda = async (functionName, payload) => {
    setLoading(true);
    try {
      const credentials = await Auth.currentCredentials();
      const lambda = new Lambda({ region: "us-east-1", credentials });
      const params = { FunctionName: functionName, Payload: JSON.stringify(payload) };
      const { Payload } = await lambda.invoke(params).promise();
      setResponse(JSON.parse(Payload).response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerFetchApiSerasa = async (numDocument, tipoPessoa) => {
    const environment = getEnvironment();
    const functionName = "ApiSerasa-serasa";
    const payload = { numDocument, tipoPessoa, ambiente: environment };
    await invokeLambda(functionName, payload);
  };

  return { response, error, loading, invokeLambda, triggerFetchApiSerasa };
};

export default useLambda;
