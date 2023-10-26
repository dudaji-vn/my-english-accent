import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS} from '../../constants/design-system';
import React from 'react';
import {Subtract} from '../icons';
import {View} from 'native-base';

export const NavbarButton = ({children, isFocused, onPress}: any) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isFocused ? -32 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, translateY]);
  return (
    <View style={styles.btnWrapper}>
      {isFocused && (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.svgGapFiller} />
          <Subtract />
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
      <TouchableOpacity onPress={onPress} style={styles.btn}>
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
    height: 64,
  },
  btn: {
    flex: 1,
    position: 'absolute',
    aspectRatio: 1,
    height: '100%',
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
