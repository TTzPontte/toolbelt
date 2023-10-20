// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EntityType = {
  "PJ": "PJ",
  "PF": "PF"
};

const ReportStatus = {
  "PROCESSING": "PROCESSING",
  "SUCCESS": "SUCCESS",
  "ERROR_SERASA": "ERROR_SERASA",
  "ERROR_PIPEFY": "ERROR_PIPEFY"
};

const { PredictusReport, SerasaPartnerReport, SerasaReport } = initSchema(schema);

export {
  PredictusReport,
  SerasaPartnerReport,
  SerasaReport,
  EntityType,
  ReportStatus
};