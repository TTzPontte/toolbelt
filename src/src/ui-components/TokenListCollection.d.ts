/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TokenListItemProps } from "./TokenListItem";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenListCollectionOverridesProps = {
    TokenListCollection?: PrimitiveOverrideProps<CollectionProps>;
    TokenListItem?: TokenListItemProps;
} & EscapeHatchProps;
export declare type TokenListCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => TokenListItemProps;
} & {
    overrides?: TokenListCollectionOverridesProps | undefined | null;
}>;
export default function TokenListCollection(props: TokenListCollectionProps): React.ReactElement;
