import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../constants/design-system';
import React from 'react';
import {Subtract} from '../icons';

export const NavbarButtonActive = ({children, onPress}: any) => {
  return (
    <View style={styles.btnWrapper}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.svgGapFiller} />
        <Subtract />
        <View style={styles.svgGapFiller} />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.btn]}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    position: 'absolute',
    top: -36,
    width: 72,
    height: 72,
    borderRadius: 999999,
    backgroundColor: COLORS.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  svgGapFiller: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
