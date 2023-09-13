const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const listTodos = gql`
  query listOrganizations {
    listOrganizations {
      nextToken
      startedAt
      items {
        id
      }
    }
  }
`;

export const handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: "https://k6qx26hsdjgwrptxwoiqvhc6cm.appsync-api.us-east-1.amazonaws.com/graphql",
      method: "post",
      headers: {
        "x-api-key": "da2-c7grlwsaanbahls6mj6c4xf77a"
      },
      data: {
        query: print(listTodos)
      }
    });
    const body = {
      graphqlData: graphqlData.data.data.listOrganizations
    };
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (err) {
    console.log("error posting to appsync: ", err);
  }
};
