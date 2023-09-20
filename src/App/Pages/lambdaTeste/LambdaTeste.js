import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';

// Custom Hook to handle Lambda invocation
const useLambda = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const invokeLambda = async (functionName, payload) => {
    setLoading(true);
    try {
      const credentials = await Auth.currentCredentials();
      const lambda = new Lambda({ region: 'us-east-1', credentials });
      const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload),
      };
      const result = await lambda.invoke(params).promise();
      setResponse(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerFetchApiSerasa = async (numDocument, tipoPessoa) => {
    const environment = getEnvironment();
    const functionName = 'ApiSerasa-serasa';
    const payload = { numDocument, tipoPessoa, ambiente: environment };
    await invokeLambda(functionName, payload);
  };

  return { response, error, loading, invokeLambda, triggerFetchApiSerasa };
};

// Function to get the environment
const getEnvironment = () => {
  return window.location.hostname === 'localhost' ? 'dev' : 'prod';
};

// Main Component
const LambdaTester = () => {
  const { response, error, loading, triggerFetchApiSerasa } = useLambda();

  const handleButtonClick = async () => {
    await triggerFetchApiSerasa('00000197041', 'PF');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (response) return <div>Response: {JSON.stringify(response)}</div>;

  return (
      <div>
        <Button onClick={handleButtonClick}>Click Me!</Button>
      </div>
  );
};

export default LambdaTester;
