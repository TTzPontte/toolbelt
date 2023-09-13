/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      __typename
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
      createdAt
      updatedAt
      __typename
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
