/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TokenListItemProps } from "./TokenListItem";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenListItemCollectionOverridesProps = {
    TokenListItemCollection?: PrimitiveOverrideProps<CollectionProps>;
    TokenListItem?: TokenListItemProps;
} & EscapeHatchProps;
export declare type TokenListItemCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => TokenListItemProps;
} & {
    overrides?: TokenListItemCollectionOverridesProps | undefined | null;
}>;
export default function TokenListItemCollection(props: TokenListItemCollectionProps): React.ReactElement;
