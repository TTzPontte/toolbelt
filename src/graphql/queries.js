/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
