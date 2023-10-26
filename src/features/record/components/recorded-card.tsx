import LottieView from 'lottie-react-native';
import {HStack, Pressable, View} from 'native-base';
import React, {useRef, useImperativeHandle} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Volume2} from 'react-native-feather';
import {SmallMicFilledIcon, TrashIcon} from '../../../components/icons';
import {PressableIcon} from '../../../components/pressable-icon';
import {COLORS} from '../../../constants/design-system';
import {useAudioRecord} from '../../../hooks/use-audio-record';

type Props = {
  children?: React.ReactNode;
  recordUri?: string;
  onDelete?: () => void;
  onReRecord?: () => void;
  onPressPlay?: () => void;
};

// Define an interface for the exposed methods
export interface RecordedCardMethods {
  handlePressPlayOrPause: () => void;
  stopPlayer: () => void;
  startPlayer: () => void;
}

export const RecordedCard = React.forwardRef<RecordedCardMethods, Props>(
  ({children, recordUri, onDelete, onReRecord, onPressPlay}: Props, ref) => {
    const {startPlayer, stopPlayer, isPlaying} = useAudioRecord(recordUri);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isPressing, setIsPressing] = React.useState(false);
    const zoom = useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
      const scale = isPressing ? 0.8 : 1;
      Animated.spring(zoom, {
        toValue: scale,
        speed: 100,
        useNativeDriver: true,
      }).start();
    }, [isPressing, zoom]);

    const handlePressPlayOrPause = async () => {
      if (onPressPlay) {
        onPressPlay();
      }
      if (!isPlaying) {
        await startPlayer();
      } else {
        await stopPlayer();
      }
    };

    // Use useImperativeHandle to expose the function
    useImperativeHandle(ref, () => ({
      handlePressPlayOrPause,
      stopPlayer,
      startPlayer,
    }));

    return (
      <View rounded="lg" bg="white" shadow="e3" p={4}>
        <View rounded="lg" bg={COLORS.darkerBackground} p={4}>
          {children}
        </View>
        <View alignItems="center" w="full">
          <HStack
            mt={4}
            w={60}
            alignSelf="center"
            justifyContent={recordUri ? 'space-between' : 'center'}
            alignItems="center">
            <PressableIcon onPress={onReRecord}>
              <SmallMicFilledIcon opacity={0.6} />
            </PressableIcon>
            {recordUri && (
              <Pressable
                onPressIn={() => setIsPressing(true)}
                onPressOut={() => setIsPressing(false)}
                onPress={handlePressPlayOrPause}
                alignSelf="center"
                rounded="full">
                <Animated.View
                  style={{
                    borderRadius: 999,
                    width: 60,
                    height: 60,
                    transform: [{scale: zoom}],
                    backgroundColor: isPlaying
                      ? COLORS.highlight
                      : COLORS.stroke,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {isPlaying ? (
                    <LottieView
                      style={styles.speaker}
                      source={require('../../../assets/jsons/speaker-animation-white.json')}
                      autoPlay
                      loop
                    />
                  ) : (
                    <Volume2 width={30} height={30} color={COLORS.highlight} />
                  )}
                </Animated.View>
              </Pressable>
            )}

            {recordUri && (
              <PressableIcon
                onPressIn={() => setIsDeleting(true)}
                onPressOut={() => setIsDeleting(false)}
                p={4}
                onPress={onDelete}>
                <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
              </PressableIcon>
            )}
          </HStack>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  speaker: {
    width: 56,
    height: 56,
  },
});
