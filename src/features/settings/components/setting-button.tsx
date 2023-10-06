import {HStack, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS} from '../../../constants/design-system';
import React from 'react';

type Props = {
  title?: string;
  onPress: () => void;
  leftElement?: React.ReactNode;
  children?: React.ReactNode;
};

export const SettingButton = ({
  title,
  children,
  onPress,
  leftElement,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <HStack alignItems="center" justifyContent="space-between">
        {title && (
          <Text fontSize="md" color={COLORS.text}>
            {title}
          </Text>
        )}
        {children && children}
        {leftElement && leftElement}
      </HStack>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.background,
    height: 56,
    borderRadius: 8,
    padding: 16,
  },
});
