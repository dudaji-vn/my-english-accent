import {View} from 'native-base';
import React from 'react';
import {COLORS} from '../../constants/design-system';
import LottieView from 'lottie-react-native';

const LottiePlaying = () => {
  return (
    <View
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={40}
      w={20}
      h={20}
      bg={COLORS.highlight}>
      <LottieView
        style={{
          width: 80,
          height: 80,
        }}
        source={require('../../assets/jsons/speaker-animation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LottiePlaying;
