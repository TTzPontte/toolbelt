/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSerasaReport = /* GraphQL */ `
  query GetSerasaReport($id: ID!) {
    getSerasaReport(id: $id) {
      id
      type
      documentNumber
      pipefyId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listSerasaReports = /* GraphQL */ `
  query ListSerasaReports(
    $filter: ModelSerasaReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSerasaReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        documentNumber
        pipefyId
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSerasaReports = /* GraphQL */ `
  query SyncSerasaReports(
    $filter: ModelSerasaReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSerasaReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        documentNumber
        pipefyId
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
