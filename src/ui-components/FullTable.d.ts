/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { TrProps } from "./Tr";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FullTableOverridesProps = {
    FullTable?: PrimitiveOverrideProps<FlexProps>;
    th?: PrimitiveOverrideProps<FlexProps>;
    "Frame 507"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 153"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 513"?: PrimitiveOverrideProps<FlexProps>;
    "File name"?: PrimitiveOverrideProps<TextProps>;
    "Frame 51638463301"?: PrimitiveOverrideProps<FlexProps>;
    "Polygon 938463302"?: PrimitiveOverrideProps<IconProps>;
    "Polygon 638463303"?: PrimitiveOverrideProps<IconProps>;
    "Frame 509"?: PrimitiveOverrideProps<FlexProps>;
    Access?: PrimitiveOverrideProps<TextProps>;
    "Frame 51638463306"?: PrimitiveOverrideProps<FlexProps>;
    "Polygon 938463307"?: PrimitiveOverrideProps<IconProps>;
    "Polygon 638463308"?: PrimitiveOverrideProps<IconProps>;
    "Frame 510"?: PrimitiveOverrideProps<FlexProps>;
    Owner?: PrimitiveOverrideProps<TextProps>;
    "Frame 51638463311"?: PrimitiveOverrideProps<FlexProps>;
    "Polygon 938463312"?: PrimitiveOverrideProps<IconProps>;
    "Polygon 638463313"?: PrimitiveOverrideProps<IconProps>;
    "Frame 511"?: PrimitiveOverrideProps<FlexProps>;
    Date?: PrimitiveOverrideProps<TextProps>;
    "Frame 51638463316"?: PrimitiveOverrideProps<FlexProps>;
    "Polygon 938463317"?: PrimitiveOverrideProps<IconProps>;
    "Polygon 638463318"?: PrimitiveOverrideProps<IconProps>;
    "Frame 512"?: PrimitiveOverrideProps<FlexProps>;
    tr?: TrProps;
} & EscapeHatchProps;
export declare type FullTableProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: FullTableOverridesProps | undefined | null;
}>;
export default function FullTable(props: FullTableProps): React.ReactElement;
