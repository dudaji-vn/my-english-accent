import {HStack, Pressable, View} from 'native-base';
import React from 'react';
import {Animated} from 'react-native';
import {Volume2} from 'react-native-feather';
import {
  MicFilledIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {useAudioRecord} from '../../../hooks/use-audio-record';

type Props = {
  children?: React.ReactNode;
  recordUri?: string;
};

export const RecordedCard = ({children, recordUri}: Props) => {
  const {startPlayer, stopPlayer, deleteRecord, isPlaying} =
    useAudioRecord(recordUri);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isPressing, setIsPressing] = React.useState(false);
  const zoom = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    const scale = isPressing ? 0.8 : 1;
    Animated.spring(zoom, {
      toValue: scale,
      speed: 100,
      useNativeDriver: true,
    }).start();
  }, [isPressing, zoom]);

  const handlePressPlayOrPause = async () => {
    if (!isPlaying) {
      await startPlayer();
    } else {
      await stopPlayer();
    }
  };
  const handlePressDelete = async () => {
    setIsDeleting(true);
    await deleteRecord();
    setIsDeleting(false);
  };

  return (
    <View rounded="lg" bg="white" shadow="e3" p={4}>
      <View rounded="lg" bg={COLORS.darkerBackground} p={4}>
        {children}
      </View>
      <View alignItems="center" w="full">
        <HStack
          mt={4}
          w={68}
          alignSelf="center"
          justifyContent="space-between"
          alignItems="center">
          <Pressable p={4} onPress={handlePressPlayOrPause}>
            <MicFilledIcon opacity={0.6} />
          </Pressable>
          <Pressable
            onPressIn={() => setIsPressing(true)}
            onPressOut={() => setIsPressing(false)}
            onPress={startPlayer}
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
                backgroundColor: COLORS.stroke,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Volume2 width={40} height={40} color="white" />
            </Animated.View>
          </Pressable>

          <Pressable p={4} onPress={handlePressDelete}>
            <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
          </Pressable>
        </HStack>
      </View>
    </View>
  );
};
