import {Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: StyleSheet.NamedStyles<any>;
};

export const Text600 = (props: Props) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
  },
});
