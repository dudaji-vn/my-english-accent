import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface RowProps {
  children: ReactNode;
  rowStyle?: StyleProp<ViewStyle> | undefined;
}

const Row: React.FC<RowProps> = ({children, rowStyle}) => {
  return <View style={[styles.row, rowStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

export default Row;
