/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPredictusReport = /* GraphQL */ `
  query GetPredictusReport($id: ID!) {
    getPredictusReport(id: $id) {
      id
      documentNumber
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
export const listPredictusReports = /* GraphQL */ `
  query ListPredictusReports(
    $filter: ModelPredictusReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPredictusReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        documentNumber
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
export const syncPredictusReports = /* GraphQL */ `
  query SyncPredictusReports(
    $filter: ModelPredictusReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPredictusReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        documentNumber
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
export const getSerasaPartnerReport = /* GraphQL */ `
  query GetSerasaPartnerReport($id: ID!) {
    getSerasaPartnerReport(id: $id) {
      id
      type
      documentNumber
      pipefyId
      status
      filePath
      serasareportID
      SerasaReport {
        id
        type
        documentNumber
        pipefyId
        status
        SerasaPartnerReports {
          items {
            id
            type
            documentNumber
            pipefyId
            status
            filePath
            serasareportID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listSerasaPartnerReports = /* GraphQL */ `
  query ListSerasaPartnerReports(
    $filter: ModelSerasaPartnerReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSerasaPartnerReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        documentNumber
        pipefyId
        status
        filePath
        serasareportID
        SerasaReport {
          id
          type
          documentNumber
          pipefyId
          status
          SerasaPartnerReports {
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSerasaPartnerReports = /* GraphQL */ `
  query SyncSerasaPartnerReports(
    $filter: ModelSerasaPartnerReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSerasaPartnerReports(
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
        filePath
        serasareportID
        SerasaReport {
          id
          type
          documentNumber
          pipefyId
          status
          SerasaPartnerReports {
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const serasaPartnerReportsBySerasareportID = /* GraphQL */ `
  query SerasaPartnerReportsBySerasareportID(
    $serasareportID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSerasaPartnerReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    serasaPartnerReportsBySerasareportID(
      serasareportID: $serasareportID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        documentNumber
        pipefyId
        status
        filePath
        serasareportID
        SerasaReport {
          id
          type
          documentNumber
          pipefyId
          status
          SerasaPartnerReports {
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSerasaReport = /* GraphQL */ `
  query GetSerasaReport($id: ID!) {
    getSerasaReport(id: $id) {
      id
      type
      documentNumber
      pipefyId
      status
      SerasaPartnerReports {
        items {
          id
          type
          documentNumber
          pipefyId
          status
          filePath
          serasareportID
          SerasaReport {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
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
        SerasaPartnerReports {
          items {
            id
            type
            documentNumber
            pipefyId
            status
            filePath
            serasareportID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
            __typename
          }
          nextToken
          startedAt
          __typename
        }
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
        SerasaPartnerReports {
          items {
            id
            type
            documentNumber
            pipefyId
            status
            filePath
            serasareportID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
            __typename
          }
          nextToken
          startedAt
          __typename
        }
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
