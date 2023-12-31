import {HStack, Heading, Text, VStack, View} from 'native-base';

import React from 'react';

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  confirmButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  footer?: React.ReactNode;
};

export const ModalCard = (props: Props) => {
  return (
    <VStack p={8} space={8} justifyContent="center">
      <VStack space={3}>
        <Heading textAlign="center" fontSize="xl" fontWeight="medium">
          {props.title}
        </Heading>
        <VStack space={8}>
          {props.children && <View>{props.children}</View>}
          {props?.description && (
            <Text textAlign="center">{props.description}</Text>
          )}
          <HStack space={8} justifyContent="center">
            {props.cancelButton}
            {props.confirmButton}
          </HStack>
          {props.footer}
        </VStack>
      </VStack>
    </VStack>
  );
};
