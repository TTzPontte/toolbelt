export const graphQLFetcher = (graphQLParams) => {
  const APPSYNC_API_URL =
    "https://k6qx26hsdjgwrptxwoiqvhc6cm.appsync-api.us-east-1.amazonaws.com/graphql";
  const credentialsAppSync = {
    "x-api-key": "da2-c7grlwsaanbahls6mj6c4xf77a"
  };
  return fetch(APPSYNC_API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...credentialsAppSync
    },
    body: JSON.stringify(graphQLParams),
    credentials: "omit"
  }).then(response => response.json().catch(() => response.text()));
};
