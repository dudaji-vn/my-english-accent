import LottieView from 'lottie-react-native';
import React from 'react';

import {Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

type Props = {};

export const LoadingScreen = ({}: Props) => {
  return (
    <View bg="white" justifyContent="center" alignItems="center" flex={1}>
      <LottieView
        style={styles.loading}
        source={require('../../assets/jsons/loading-animation.json')}
        autoPlay
        loop
      />
      <Text mt={4}>Please be patient...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 80,
    height: 60,
  },
});
