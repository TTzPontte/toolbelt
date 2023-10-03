/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenListItemOverridesProps = {
    TokenListItem?: PrimitiveOverrideProps<FlexProps>;
    "Frame 33438463270"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 332"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    Token?: PrimitiveOverrideProps<TextProps>;
    "Frame 333"?: PrimitiveOverrideProps<FlexProps>;
    Value?: PrimitiveOverrideProps<TextProps>;
    "Frame 33438463276"?: PrimitiveOverrideProps<FlexProps>;
    Variation?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type TokenListItemProps = React.PropsWithChildren<Partial<FlexProps> & {
    token?: String;
    value?: String;
    variation?: String;
} & {
    overrides?: TokenListItemOverridesProps | undefined | null;
}>;
export default function TokenListItem(props: TokenListItemProps): React.ReactElement;
