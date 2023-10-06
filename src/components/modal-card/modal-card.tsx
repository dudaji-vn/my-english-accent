import {HStack, Heading, Text, VStack, View} from 'native-base';

import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
};

export const ModalCard = (props: Props) => {
  return (
    <VStack p={8} space={8} justifyContent="center">
      <VStack space={4}>
        <Heading textAlign="center" fontSize="xl" fontWeight="medium">
          {props.title}
        </Heading>
        <Text textAlign="center">{props.children}</Text>
      </VStack>
      <HStack space={2} justifyContent="center">
        {/* {props.cancelButton} */}
        {props.confirmButton}
      </HStack>
    </VStack>
  );
};
