/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PredictusReport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PredictusReportUpdateFormInputValues = {
    documentNumber?: string;
    status?: string;
};
export declare type PredictusReportUpdateFormValidationValues = {
    documentNumber?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PredictusReportUpdateFormOverridesProps = {
    PredictusReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type PredictusReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: PredictusReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    predictusReport?: PredictusReport;
    onSubmit?: (fields: PredictusReportUpdateFormInputValues) => PredictusReportUpdateFormInputValues;
    onSuccess?: (fields: PredictusReportUpdateFormInputValues) => void;
    onError?: (fields: PredictusReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PredictusReportUpdateFormInputValues) => PredictusReportUpdateFormInputValues;
    onValidate?: PredictusReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PredictusReportUpdateForm(props: PredictusReportUpdateFormProps): React.ReactElement;
