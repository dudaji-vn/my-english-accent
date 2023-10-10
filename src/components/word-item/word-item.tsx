import {HStack, Text} from 'native-base';
import React from 'react';
import {COLORS} from '../../constants/design-system';
import {TouchableOpacity} from 'react-native';

type Props = {
  word: string;
  status: 'default' | 'active' | 'disabled';
  leftElement: React.ReactNode;
  onPress?: () => void;
};

export const WordItem = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.onPress === undefined ? true : false}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        w="full"
        rounded="lg"
        bg={
          props.status === 'disabled'
            ? COLORS.lighterBackground
            : COLORS.background
        }
        px={4}
        py={5}>
        <Text
          textTransform="capitalize"
          fontWeight="bold"
          color={
            props.status === 'active'
              ? COLORS.highlight
              : props.status === 'disabled'
              ? COLORS.stroke
              : COLORS.text
          }>
          {props.word}
        </Text>
        {props.leftElement}
      </HStack>
    </TouchableOpacity>
  );
};
