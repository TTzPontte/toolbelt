/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, RadioGroupFieldProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SerasaPartnerReport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SerasaReportCreateFormInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
    status?: string;
    SerasaPartnerReports?: SerasaPartnerReport[];
};
export declare type SerasaReportCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    SerasaPartnerReports?: ValidationFunction<SerasaPartnerReport>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SerasaReportCreateFormOverridesProps = {
    SerasaReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<RadioGroupFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    SerasaPartnerReports?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SerasaReportCreateFormProps = React.PropsWithChildren<{
    overrides?: SerasaReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SerasaReportCreateFormInputValues) => SerasaReportCreateFormInputValues;
    onSuccess?: (fields: SerasaReportCreateFormInputValues) => void;
    onError?: (fields: SerasaReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SerasaReportCreateFormInputValues) => SerasaReportCreateFormInputValues;
    onValidate?: SerasaReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function SerasaReportCreateForm(props: SerasaReportCreateFormProps): React.ReactElement;
