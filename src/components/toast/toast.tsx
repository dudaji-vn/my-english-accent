import {HStack, Pressable} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';

type Props = {
  children: React.ReactNode;
  leftElement?: React.ReactNode;
  leftElementOnPress?: () => void;
};
var fullWidth = Dimensions.get('window').width;
export const Toast = (props: Props) => {
  return (
    <HStack
      justifyContent="space-between"
      rounded="lg"
      bg="black"
      opacity={0.8}
      w={fullWidth - 40}
      px={3}
      py={4}>
      <Text style={styles.text}>{props.children}</Text>
      {props.leftElement && (
        <Pressable onPress={props.leftElementOnPress}>
          <Text style={styles.font}>{props.leftElement}</Text>
        </Pressable>
      )}
    </HStack>
  );
};

const styles = StyleSheet.create({
  font: {
    fontWeight: '600',
    color: COLORS.highlight,
    textDecorationLine: 'underline',
  },
  text: {
    color: 'white',
  },
});
