/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import TokenListItem from "./TokenListItem";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Collection } from "@aws-amplify/ui-react";
export default function TokenListItemCollection(props) {
  const { items, overrideItems, overrides, ...rest } = props;
  return (
    <Collection
      type="list"
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "TokenListItemCollection")}
      {...rest}
    >
      {(item, index) => (
        <TokenListItem
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></TokenListItem>
      )}
    </Collection>
  );
}
