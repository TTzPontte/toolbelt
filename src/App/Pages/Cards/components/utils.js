import { Auth } from "aws-amplify";
import { Lambda } from "aws-sdk";

export function formatNumber(number) {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Convert the number to a string
  const numberString = number.toString();

  // Split the string into integer and decimal parts (if any)
  const [integerPart, decimalPart] = numberString.split(".");

  // Format the integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // If there is a decimal part, include it in the result
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

export const invokeLambda = async () => {
  try {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: "us-east-1", credentials });
    const response = await lambda
      .invoke({
        FunctionName: "GetAllContractReportsFunction-ElasticsearchMicroService",
        Payload: JSON.stringify({ environment: "us-east-1" })
      })
      .promise();

    const parsedResponse = JSON.parse(response.Payload).body;

    return {
      simulation:
        JSON.parse(parsedResponse).aggregations.by_status.buckets[0].data.hits
          .hits,
      signup:
        JSON.parse(parsedResponse).aggregations.by_status.buckets[1].data.hits
          .hits
    };
  } catch (error) {
    console.error("Error invoking lambda:", error);
    throw error;
  }
};
