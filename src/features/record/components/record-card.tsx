import {HStack, Image, Pressable, Text, VStack, View} from 'native-base';
import React from 'react';
import {COLORS} from '../../../constants/design-system';
import {
  PauseIcon,
  PlayIcon,
  SpeakerIcon,
  TrashIcon,
} from '../../../components/icons';
import {Animated} from 'react-native';

const VNFlag = require('../../../assets/images/VietNamFlagIcon.png');
type Props = {
  children?: React.ReactNode;
};

export const RecordCard = ({children}: Props) => {
  const pronunciation = 'ˈyo͞ozər ˈin(t)ərˌfās';
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPressing, setIsPressing] = React.useState(false);
  const [isRecorded, setIsRecorded] = React.useState(false);
  const zoom = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const scale = isPressing ? 0.8 : 1;
    Animated.spring(zoom, {
      toValue: scale,
      speed: 100,
      useNativeDriver: true,
    }).start();
  }, [isPressing, zoom]);

  return (
    <View rounded="lg" bg="white" shadow="e3" p={4}>
      <View rounded="lg" bg={COLORS.darkerBackground} p={4}>
        {children}
      </View>
      <HStack
        mt={4}
        w={68}
        alignSelf="center"
        justifyContent="space-between"
        alignItems="center">
        <Pressable p={4} onPress={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Pressable>
        <Pressable
          onPressIn={() => setIsPressing(true)}
          onPressOut={() => setIsPressing(false)}
          onPress={() => setIsRecording(!isRecording)}
          borderWidth={1}
          borderColor={COLORS.stroke}
          alignSelf="center"
          rounded="full"
          p={2}>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderRadius: 999,
              padding: 8,
              width: 64,
              height: 64,
              transform: [{scale: zoom}],
              backgroundColor: isRecording ? COLORS.highlight : COLORS.error,
            }}
          />
        </Pressable>
        <Pressable p={4} onPress={() => setIsDeleting(!isDeleting)}>
          <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
        </Pressable>
      </HStack>
    </View>
  );
};
