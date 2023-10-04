import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {COLORS} from '../../constants/design-system';
import React from 'react';

export const NavbarButtonActive = ({children, onPress}: any) => {
  return (
    <View style={styles.btnWrapper}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.svgGapFiller} />
        <Svg width={71} height={58} viewBox="0 0 75 61">
          <Path
            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            fill={COLORS.primary}
          />
        </Svg>
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
    top: -22,
    width: 50,
    height: 50,
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
