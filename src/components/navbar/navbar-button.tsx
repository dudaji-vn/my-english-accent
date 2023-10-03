import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {COLORS} from '../../constants/design-system';
import React from 'react';

export const NavbarButton = ({children, isFocused, onPress}: any) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isFocused ? -22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, translateY]);
  return (
    <View style={styles.btnWrapper}>
      {isFocused && (
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
      )}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.inActiveHolder,
          opacity: isFocused ? 0 : 1,
        }}
      />
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btn}>
        <Animated.View
          style={{
            transform: [{translateY}],
          }}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    height: 50,
  },
  btn: {
    flex: 1,
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 999999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  svgGapFiller: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  inActiveHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
  },
});
