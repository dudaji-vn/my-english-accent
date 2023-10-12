import {HStack} from 'native-base';
import React from 'react';
import {Animated, StyleSheet} from 'react-native';

type Props = {
  value: number;
};

export const SoundWave = ({value}: Props) => {
  const firstLineHeightAnimated = React.useRef(new Animated.Value(8)).current;
  const middleLineHeightAnimated = React.useRef(new Animated.Value(8)).current;
  const lastLineHeightAnimated = React.useRef(new Animated.Value(8)).current;
  const [animatedValue, setAnimatedValue] = React.useState(
    new Animated.Value(value),
  );

  React.useEffect(() => {
    setAnimatedValue(new Animated.Value(value));
  }, [value]);

  React.useEffect(() => {
    Animated.timing(firstLineHeightAnimated, {
      toValue: animatedValue.interpolate({
        inputRange: [0, 36],
        outputRange: [32, 8],
      }),
      duration: 200,
      delay: 0,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, firstLineHeightAnimated]);
  React.useEffect(() => {
    Animated.timing(middleLineHeightAnimated, {
      toValue: animatedValue.interpolate({
        inputRange: [0, 36],
        outputRange: [40, 8],
      }),
      duration: 200,
      delay: 75,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, middleLineHeightAnimated]);
  React.useEffect(() => {
    Animated.timing(lastLineHeightAnimated, {
      toValue: animatedValue.interpolate({
        inputRange: [0, 36],
        outputRange: [28, 8],
      }),
      delay: 25,
      duration: 200,

      useNativeDriver: false,
    }).start();
  }, [animatedValue, lastLineHeightAnimated]);

  return (
    <HStack
      alignItems="center"
      space={1}
      justifyContent="center"
      w="full"
      h="full">
      <Animated.View
        style={[
          styles.container,
          {
            height: firstLineHeightAnimated,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.container,
          {
            height: middleLineHeightAnimated,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.container,
          {
            height: lastLineHeightAnimated,
          },
        ]}
      />
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 6,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'white',
  },
});
