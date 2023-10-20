import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum EntityType {
  PJ = "PJ",
  PF = "PF"
}

export enum ReportStatus {
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  ERROR_SERASA = "ERROR_SERASA",
  ERROR_PIPEFY = "ERROR_PIPEFY"
}



type EagerPredictusReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PredictusReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly documentNumber: string;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPredictusReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PredictusReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly documentNumber: string;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PredictusReport = LazyLoading extends LazyLoadingDisabled ? EagerPredictusReport : LazyPredictusReport

export declare const PredictusReport: (new (init: ModelInit<PredictusReport>) => PredictusReport) & {
  copyOf(source: PredictusReport, mutator: (draft: MutableModel<PredictusReport>) => MutableModel<PredictusReport> | void): PredictusReport;
}

type EagerSerasaPartnerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SerasaPartnerReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: EntityType | keyof typeof EntityType | null;
  readonly documentNumber?: string | null;
  readonly pipefyId?: string | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly filePath?: string | null;
  readonly serasareportID: string;
  readonly SerasaReport?: SerasaReport | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySerasaPartnerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SerasaPartnerReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: EntityType | keyof typeof EntityType | null;
  readonly documentNumber?: string | null;
  readonly pipefyId?: string | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly filePath?: string | null;
  readonly serasareportID: string;
  readonly SerasaReport: AsyncItem<SerasaReport | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SerasaPartnerReport = LazyLoading extends LazyLoadingDisabled ? EagerSerasaPartnerReport : LazySerasaPartnerReport

export declare const SerasaPartnerReport: (new (init: ModelInit<SerasaPartnerReport>) => SerasaPartnerReport) & {
  copyOf(source: SerasaPartnerReport, mutator: (draft: MutableModel<SerasaPartnerReport>) => MutableModel<SerasaPartnerReport> | void): SerasaPartnerReport;
}

type EagerSerasaReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SerasaReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: EntityType | keyof typeof EntityType | null;
  readonly documentNumber: string;
  readonly pipefyId?: string | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly SerasaPartnerReports?: (SerasaPartnerReport | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySerasaReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SerasaReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: EntityType | keyof typeof EntityType | null;
  readonly documentNumber: string;
  readonly pipefyId?: string | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly SerasaPartnerReports: AsyncCollection<SerasaPartnerReport>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SerasaReport = LazyLoading extends LazyLoadingDisabled ? EagerSerasaReport : LazySerasaReport

export declare const SerasaReport: (new (init: ModelInit<SerasaReport>) => SerasaReport) & {
  copyOf(source: SerasaReport, mutator: (draft: MutableModel<SerasaReport>) => MutableModel<SerasaReport> | void): SerasaReport;
}