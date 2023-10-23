import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export const VolumeIcon = () => {
  return (
    <View>
      <LottieView
        style={{width: 250, height: 250}}
        source={require('../../assets/images/Loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};
