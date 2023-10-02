/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { SerasaReport } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TableRowItemOverridesProps = {
    TableRowItem?: PrimitiveOverrideProps<FlexProps>;
    td38541264?: PrimitiveOverrideProps<FlexProps>;
    Id?: PrimitiveOverrideProps<TextProps>;
    td38541266?: PrimitiveOverrideProps<FlexProps>;
    documentNumber?: PrimitiveOverrideProps<TextProps>;
    td38541268?: PrimitiveOverrideProps<FlexProps>;
    CreatedAt?: PrimitiveOverrideProps<TextProps>;
    td38541270?: PrimitiveOverrideProps<FlexProps>;
    PipefyId?: PrimitiveOverrideProps<TextProps>;
    td38541310?: PrimitiveOverrideProps<FlexProps>;
    Status?: PrimitiveOverrideProps<TextProps>;
    td38541272?: PrimitiveOverrideProps<FlexProps>;
    "Group 1272"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 53538541274"?: PrimitiveOverrideProps<ViewProps>;
    pen16Black?: PrimitiveOverrideProps<ViewProps>;
    Vector38541276?: PrimitiveOverrideProps<IconProps>;
    "Group 1274"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 53538541278"?: PrimitiveOverrideProps<ViewProps>;
    trash16Black?: PrimitiveOverrideProps<ViewProps>;
    Vector38541280?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type TableRowItemProps = React.PropsWithChildren<Partial<FlexProps> & {
    serasaPartnerReport?: SerasaReport;
} & {
    overrides?: TableRowItemOverridesProps | undefined | null;
}>;
export default function TableRowItem(props: TableRowItemProps): React.ReactElement;
