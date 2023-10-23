import {HStack} from 'native-base';
import React, {memo} from 'react';
import {COLORS} from '../../constants/design-system';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  word: string;
  status?: 'default' | 'active' | 'disabled';
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  justifyContent?: 'space-between' | 'flex-start' | 'flex-end';
};

export const WordItem = memo(({status = 'default', ...props}: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.onPress === undefined ? true : false}>
      <HStack
        alignItems="center"
        // justifyContent={props.justifyContent || 'space-between'}
        w="full"
        rounded="lg"
        bg={
          status === 'disabled' ? COLORS.lighterBackground : COLORS.background
        }
        px={4}
        py={5}>
        {props.leftElement}
        <Text
          style={[
            styles.text,
            {
              color:
                status === 'active'
                  ? COLORS.text
                  : status === 'disabled'
                  ? COLORS.stroke
                  : COLORS.text,
            },
          ]}>
          {props.word}
        </Text>
        {props.rightElement}
      </HStack>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
});
