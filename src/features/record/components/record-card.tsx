import {HStack, Pressable, View} from 'native-base';
import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {PauseIcon, PlayIcon, TrashIcon} from '../../../components/icons';
import {SoundWave} from '../../../components/sound-wave';
import {COLORS} from '../../../constants/design-system';
import {useAudioRecord} from '../../../hooks/use-audio-record';

type Props = {
  children?: React.ReactNode;
  onHasRecord?: (uri: string) => void;
  onNoRecord?: () => void;
};

export const RecordCard = ({children, onHasRecord, onNoRecord}: Props) => {
  const {
    startRecording,
    stopRecording,
    cacheFilePath,
    startPlayer,
    stopPlayer,
    deleteRecord,
    isPlaying,
    metering,
    isRecording,
  } = useAudioRecord();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isPressing, setIsPressing] = React.useState(false);
  const zoom = React.useRef(new Animated.Value(1)).current;
  const handlePressRecord = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      await stopRecording();
    }
  };

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
  React.useEffect(() => {
    const scale = isPressing ? 0.8 : 1;
    Animated.spring(zoom, {
      toValue: scale,
      speed: 100,
      useNativeDriver: true,
    }).start();
  }, [isPressing, zoom]);
  const [animatedValue, setAnimatedValue] = React.useState(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (isRecording) {
      setAnimatedValue(new Animated.Value(1));
    } else {
      setAnimatedValue(new Animated.Value(0));
    }
  }, [isRecording]);

  useEffect(() => {
    if (cacheFilePath) {
      onHasRecord?.(cacheFilePath);
    } else {
      onNoRecord?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheFilePath]);

  Animated.timing(animatedValue, {
    toValue: isRecording ? 1 : 0,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.error, COLORS.highlight],
  });

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
          <Pressable
            disabled={!cacheFilePath || isRecording}
            opacity={!cacheFilePath || isRecording ? 0 : 1}
            p={4}
            onPress={handlePressPlayOrPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Pressable>
          <Pressable
            onPressIn={() => setIsPressing(true)}
            onPressOut={() => setIsPressing(false)}
            onPress={handlePressRecord}
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
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isRecording && <SoundWave value={metering * -1} />}
            </Animated.View>
          </Pressable>

          <Pressable
            disabled={!cacheFilePath || isRecording}
            opacity={!cacheFilePath || isRecording ? 0 : 1}
            p={4}
            onPress={handlePressDelete}>
            <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
          </Pressable>
        </HStack>
      </View>
    </View>
  );
};
