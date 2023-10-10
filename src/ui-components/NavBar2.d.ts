/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, ImageProps, ViewProps } from "@aws-amplify/ui-react";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBar2OverridesProps = {
    NavBar2?: PrimitiveOverrideProps<FlexProps>;
    Logo?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1001"?: PrimitiveOverrideProps<FlexProps>;
    Group?: PrimitiveOverrideProps<FlexProps>;
    Vector3870617?: PrimitiveOverrideProps<IconProps>;
    Vector3870618?: PrimitiveOverrideProps<IconProps>;
    "Frame 321"?: PrimitiveOverrideProps<FlexProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    Vector3870628?: PrimitiveOverrideProps<IconProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type NavBar2Props = React.PropsWithChildren<Partial<FlexProps> & {
    avatarUrl?: String;
    onClickAvatar?: (event: SyntheticEvent) => void;
} & {
    overrides?: NavBar2OverridesProps | undefined | null;
}>;
export default function NavBar2(props: NavBar2Props): React.ReactElement;
