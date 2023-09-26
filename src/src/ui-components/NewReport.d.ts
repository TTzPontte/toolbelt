/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SerasaPartnerReport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NewReportInputValues = {
    type?: string;
    documentNumber?: string;
    pipefyId?: string;
    status?: string;
    SerasaPartnerReports?: SerasaPartnerReport[];
};
export declare type NewReportValidationValues = {
    type?: ValidationFunction<string>;
    documentNumber?: ValidationFunction<string>;
    pipefyId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    SerasaPartnerReports?: ValidationFunction<SerasaPartnerReport>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewReportOverridesProps = {
    NewReportGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    documentNumber?: PrimitiveOverrideProps<TextFieldProps>;
    pipefyId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    SerasaPartnerReports?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type NewReportProps = React.PropsWithChildren<{
    overrides?: NewReportOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NewReportInputValues) => NewReportInputValues;
    onSuccess?: (fields: NewReportInputValues) => void;
    onError?: (fields: NewReportInputValues, errorMessage: string) => void;
    onChange?: (fields: NewReportInputValues) => NewReportInputValues;
    onValidate?: NewReportValidationValues;
} & React.CSSProperties>;
export default function NewReport(props: NewReportProps): React.ReactElement;
