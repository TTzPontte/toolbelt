/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SerasaReport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SerasaReportUpdateFormInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
    status?: string;
};
export declare type SerasaReportUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SerasaReportUpdateFormOverridesProps = {
    SerasaReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type SerasaReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: SerasaReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    serasaReport?: SerasaReport;
    onSubmit?: (fields: SerasaReportUpdateFormInputValues) => SerasaReportUpdateFormInputValues;
    onSuccess?: (fields: SerasaReportUpdateFormInputValues) => void;
    onError?: (fields: SerasaReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SerasaReportUpdateFormInputValues) => SerasaReportUpdateFormInputValues;
    onValidate?: SerasaReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SerasaReportUpdateForm(props: SerasaReportUpdateFormProps): React.ReactElement;
