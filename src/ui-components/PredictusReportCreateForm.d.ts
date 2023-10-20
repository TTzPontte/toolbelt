/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PredictusReportCreateFormInputValues = {
    documentNumber?: string;
    status?: string;
};
export declare type PredictusReportCreateFormValidationValues = {
    documentNumber?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PredictusReportCreateFormOverridesProps = {
    PredictusReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type PredictusReportCreateFormProps = React.PropsWithChildren<{
    overrides?: PredictusReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PredictusReportCreateFormInputValues) => PredictusReportCreateFormInputValues;
    onSuccess?: (fields: PredictusReportCreateFormInputValues) => void;
    onError?: (fields: PredictusReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PredictusReportCreateFormInputValues) => PredictusReportCreateFormInputValues;
    onValidate?: PredictusReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function PredictusReportCreateForm(props: PredictusReportCreateFormProps): React.ReactElement;
