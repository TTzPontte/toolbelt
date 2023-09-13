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
  }).then((response) => response.json().catch(() => response.text()));
};

export const _get = () => {
  const query = {
    query:
      "query MyQuery {\n  listOrganizations {\n    nextToken \n    startedAt\n    items {\n      id\n      name\n      phone\n    }\n  }\n}\n",
    variables: null,
    operationName: "MyQuery"
  };

  let connection;

  try {
    (async () => {
      connection = await graphQLFetcher(query);
    })();
  } catch (err) {
    console.log(err);
  }
  return connection;
};