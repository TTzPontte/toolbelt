/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SerasaPartnerReport, SerasaReport as SerasaReport0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SerasaPartnerReportUpdateFormInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
    status?: string;
    filePath?: string;
    SerasaReport?: SerasaReport0;
};
export declare type SerasaPartnerReportUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    filePath?: ValidationFunction<string>;
    SerasaReport?: ValidationFunction<SerasaReport0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SerasaPartnerReportUpdateFormOverridesProps = {
    SerasaPartnerReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    filePath?: PrimitiveOverrideProps<TextFieldProps>;
    SerasaReport?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SerasaPartnerReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: SerasaPartnerReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    serasaPartnerReport?: SerasaPartnerReport;
    onSubmit?: (fields: SerasaPartnerReportUpdateFormInputValues) => SerasaPartnerReportUpdateFormInputValues;
    onSuccess?: (fields: SerasaPartnerReportUpdateFormInputValues) => void;
    onError?: (fields: SerasaPartnerReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SerasaPartnerReportUpdateFormInputValues) => SerasaPartnerReportUpdateFormInputValues;
    onValidate?: SerasaPartnerReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SerasaPartnerReportUpdateForm(props: SerasaPartnerReportUpdateFormProps): React.ReactElement;
