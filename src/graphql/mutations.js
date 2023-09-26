/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSerasaPartnerReport = /* GraphQL */ `
  mutation CreateSerasaPartnerReport(
    $input: CreateSerasaPartnerReportInput!
    $condition: ModelSerasaPartnerReportConditionInput
  ) {
    createSerasaPartnerReport(input: $input, condition: $condition) {
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
export const updateSerasaPartnerReport = /* GraphQL */ `
  mutation UpdateSerasaPartnerReport(
    $input: UpdateSerasaPartnerReportInput!
    $condition: ModelSerasaPartnerReportConditionInput
  ) {
    updateSerasaPartnerReport(input: $input, condition: $condition) {
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
export const deleteSerasaPartnerReport = /* GraphQL */ `
  mutation DeleteSerasaPartnerReport(
    $input: DeleteSerasaPartnerReportInput!
    $condition: ModelSerasaPartnerReportConditionInput
  ) {
    deleteSerasaPartnerReport(input: $input, condition: $condition) {
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
export const createSerasaReport = /* GraphQL */ `
  mutation CreateSerasaReport(
    $input: CreateSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    createSerasaReport(input: $input, condition: $condition) {
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
export const updateSerasaReport = /* GraphQL */ `
  mutation UpdateSerasaReport(
    $input: UpdateSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    updateSerasaReport(input: $input, condition: $condition) {
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
export const deleteSerasaReport = /* GraphQL */ `
  mutation DeleteSerasaReport(
    $input: DeleteSerasaReportInput!
    $condition: ModelSerasaReportConditionInput
  ) {
    deleteSerasaReport(input: $input, condition: $condition) {
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
