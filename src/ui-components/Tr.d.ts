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
export declare type TrOverridesProps = {
    Tr?: PrimitiveOverrideProps<FlexProps>;
    td38463322?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 153"?: PrimitiveOverrideProps<ViewProps>;
    td38463324?: PrimitiveOverrideProps<FlexProps>;
    "Folder 1"?: PrimitiveOverrideProps<TextProps>;
    td38463326?: PrimitiveOverrideProps<FlexProps>;
    Everyone?: PrimitiveOverrideProps<TextProps>;
    td38463328?: PrimitiveOverrideProps<FlexProps>;
    Unknown?: PrimitiveOverrideProps<TextProps>;
    td38463330?: PrimitiveOverrideProps<FlexProps>;
    "05/01/2023"?: PrimitiveOverrideProps<TextProps>;
    td38463332?: PrimitiveOverrideProps<FlexProps>;
    "Group 1272"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 53538463334"?: PrimitiveOverrideProps<ViewProps>;
    pen16Black?: PrimitiveOverrideProps<ViewProps>;
    Vector38463336?: PrimitiveOverrideProps<IconProps>;
    "Group 1274"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 53538463338"?: PrimitiveOverrideProps<ViewProps>;
    trash16Black?: PrimitiveOverrideProps<ViewProps>;
    Vector38463340?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type TrProps = React.PropsWithChildren<Partial<FlexProps> & {
    serasaReport?: SerasaReport;
    hanldeViewReport?: String;
} & {
    overrides?: TrOverridesProps | undefined | null;
}>;
export default function Tr(props: TrProps): React.ReactElement;
