import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Auth, Storage } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';

const LAMBDA_FUNCTION_NAME = 'toolbelt3Predictus-ToolbeltPredictus-nQCMgHG9Y238';

const invokeLambda = async (documentNumber) => {
  try {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: 'us-east-1', credentials });
    const response = await lambda
        .invoke({
          FunctionName: LAMBDA_FUNCTION_NAME,
          Payload: JSON.stringify({ documentNumber }),
        })
        .promise();

    return JSON.parse(response.Payload);
  } catch (error) {
    console.error('Error invoking lambda:', error);
    throw error;
  }
};

const downloadFromS3 = async (fileName) => {
  try {
    const fileKey = `predictus/${fileName}.xlsx`;
    console.log({fileKey})
    const signedUrl = await Storage.get(fileKey, { level: 'public', download: false });
    return signedUrl;
  } catch (error) {
    console.error(`Failed to download ${fileName} from S3:`, error);
    throw error;
  }
};

const initiateFileDownload = (url, fileName) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const InputForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const [responseDocNumber, setResponseDocNumber] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setError(null); // Clear previous error
      const lambdaResponse = await invokeLambda(data.documentNumber);
      console.log('Lambda invocation result:', lambdaResponse);

      if (lambdaResponse.errorMessage) {
        throw new Error(lambdaResponse.errorMessage);
      }

      const signedUrl = await downloadFromS3(data.documentNumber);
      console.log('Signed URL:', signedUrl);

      initiateFileDownload(signedUrl, `${data.documentNumber}.xlsx`);

      setResponseDocNumber(data.documentNumber);
      reset(); // Optional: Clear the form after submission
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="documentNumber">
            <Form.Label>Document Number</Form.Label>
            <Controller
                name="documentNumber"
                control={control}
                defaultValue=""
                render={({ field }) => <Form.Control {...field} required />}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {responseDocNumber && <p>File for Document Number {responseDocNumber} is downloading...</p>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
  );
};

export default InputForm;
