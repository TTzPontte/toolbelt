/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function TokenListItem(props) {
  const { token, value, variation, overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="column"
      width="298px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "TokenListItem")}
      {...rest}
    >
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="34px"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        backgroundColor="rgba(71,71,71,1)"
        {...getOverrideProps(overrides, "Frame 3344055299")}
      >
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="flex-start"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="10px 10px 10px 10px"
          {...getOverrideProps(overrides, "Frame 332")}
        >
          <Flex
            gap="10px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 1")}
          >
            <Text
              fontFamily="Inter"
              fontSize="12px"
              fontWeight="600"
              color="rgba(255,255,255,1)"
              lineHeight="18px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children={token}
              {...getOverrideProps(overrides, "Token")}
            ></Text>
          </Flex>
        </Flex>
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="flex-end"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="10px 10px 10px 10px"
          {...getOverrideProps(overrides, "Frame 333")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="600"
            color="rgba(255,255,255,1)"
            lineHeight="18px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={value}
            {...getOverrideProps(overrides, "Value")}
          ></Text>
        </Flex>
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="flex-end"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="10px 10px 10px 10px"
          {...getOverrideProps(overrides, "Frame 3344055305")}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="600"
            color="rgba(255,255,255,1)"
            lineHeight="18px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={variation}
            {...getOverrideProps(overrides, "Variation")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
