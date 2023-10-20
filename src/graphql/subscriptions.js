/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePredictusReport = /* GraphQL */ `
  subscription OnCreatePredictusReport(
    $filter: ModelSubscriptionPredictusReportFilterInput
  ) {
    onCreatePredictusReport(filter: $filter) {
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
export const onUpdatePredictusReport = /* GraphQL */ `
  subscription OnUpdatePredictusReport(
    $filter: ModelSubscriptionPredictusReportFilterInput
  ) {
    onUpdatePredictusReport(filter: $filter) {
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
export const onDeletePredictusReport = /* GraphQL */ `
  subscription OnDeletePredictusReport(
    $filter: ModelSubscriptionPredictusReportFilterInput
  ) {
    onDeletePredictusReport(filter: $filter) {
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
export const onCreateSerasaPartnerReport = /* GraphQL */ `
  subscription OnCreateSerasaPartnerReport(
    $filter: ModelSubscriptionSerasaPartnerReportFilterInput
    $owner: String
  ) {
    onCreateSerasaPartnerReport(filter: $filter, owner: $owner) {
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
export const onUpdateSerasaPartnerReport = /* GraphQL */ `
  subscription OnUpdateSerasaPartnerReport(
    $filter: ModelSubscriptionSerasaPartnerReportFilterInput
    $owner: String
  ) {
    onUpdateSerasaPartnerReport(filter: $filter, owner: $owner) {
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
export const onDeleteSerasaPartnerReport = /* GraphQL */ `
  subscription OnDeleteSerasaPartnerReport(
    $filter: ModelSubscriptionSerasaPartnerReportFilterInput
    $owner: String
  ) {
    onDeleteSerasaPartnerReport(filter: $filter, owner: $owner) {
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
export const onCreateSerasaReport = /* GraphQL */ `
  subscription OnCreateSerasaReport(
    $filter: ModelSubscriptionSerasaReportFilterInput
  ) {
    onCreateSerasaReport(filter: $filter) {
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
export const onUpdateSerasaReport = /* GraphQL */ `
  subscription OnUpdateSerasaReport(
    $filter: ModelSubscriptionSerasaReportFilterInput
  ) {
    onUpdateSerasaReport(filter: $filter) {
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
export const onDeleteSerasaReport = /* GraphQL */ `
  subscription OnDeleteSerasaReport(
    $filter: ModelSubscriptionSerasaReportFilterInput
  ) {
    onDeleteSerasaReport(filter: $filter) {
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
