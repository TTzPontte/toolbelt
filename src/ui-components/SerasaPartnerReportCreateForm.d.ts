/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SerasaReport as SerasaReport0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SerasaPartnerReportCreateFormInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
    status?: string;
    filePath?: string;
    SerasaReport?: SerasaReport0;
};
export declare type SerasaPartnerReportCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    filePath?: ValidationFunction<string>;
    SerasaReport?: ValidationFunction<SerasaReport0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SerasaPartnerReportCreateFormOverridesProps = {
    SerasaPartnerReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    filePath?: PrimitiveOverrideProps<TextFieldProps>;
    SerasaReport?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SerasaPartnerReportCreateFormProps = React.PropsWithChildren<{
    overrides?: SerasaPartnerReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SerasaPartnerReportCreateFormInputValues) => SerasaPartnerReportCreateFormInputValues;
    onSuccess?: (fields: SerasaPartnerReportCreateFormInputValues) => void;
    onError?: (fields: SerasaPartnerReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SerasaPartnerReportCreateFormInputValues) => SerasaPartnerReportCreateFormInputValues;
    onValidate?: SerasaPartnerReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function SerasaPartnerReportCreateForm(props: SerasaPartnerReportCreateFormProps): React.ReactElement;
