import React from 'react';
import {Button, HStack, Image, Text, View, VStack} from 'native-base';
import {COLORS} from '../../../constants/design-system';
import {Send} from 'react-native-feather';
import {NavigationProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useWindowDimensions} from 'react-native';

type Props = {
  navigation: NavigationProp<any>;
};

export const CompleteRecordScreen = ({navigation}: Props) => {
  const w = useWindowDimensions().width;
  return (
    <View px={5} height="100%" justifyContent="center" alignItems="center">
      <VStack alignItems="center" w="full" space={10}>
        <VStack px={12} space={5} alignItems="center" justifyContent="center">
          <LottieView
            style={{
              position: 'absolute',
              width: w,
              height: w,
            }}
            source={require('../../../assets/jsons/confetti-animation.json')}
            autoPlay
            loop
          />
          <Image
            source={require('../../../assets/images/badge-record.png')}
            alt="Complete Record"
          />
          <Text
            style={{
              fontSize: 32,
              lineHeight: 40,
            }}
            bold
            color={COLORS.highlight}>
            The recorder
          </Text>
          <Text textAlign="center">
            Congratulation! You’ve just achieve{' '}
            <Text color={COLORS.highlight}>Recorder Badge</Text> by finished the
            whole list. Keep going on another one.
          </Text>
        </VStack>
        <Button
          onPress={() => navigation.goBack()}
          width="full"
          variant="outline">
          Back to main screen
        </Button>
        <HStack opacity={0.6} space={2}>
          <Send width={24} height={24} color={COLORS.text} />
          <Text>Share</Text>
        </HStack>
      </VStack>
    </View>
  );
};
