import {HStack, Pressable, View} from 'native-base';
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Volume2} from 'react-native-feather';
import {MicFilledIcon, TrashIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {useAudioRecord} from '../../../hooks/use-audio-record';
import LottieView from 'lottie-react-native';

type Props = {
  children?: React.ReactNode;
  recordUri?: string;
  onDelete?: () => void;
  onReRecord?: () => void;
};

export const RecordedCard = ({
  children,
  recordUri,
  onDelete,
  onReRecord,
}: Props) => {
  const {startPlayer, stopPlayer, isPlaying} = useAudioRecord(recordUri);
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
          <Pressable p={4} onPress={onReRecord}>
            <MicFilledIcon color={COLORS.text} opacity={0.6} />
          </Pressable>
          {recordUri && (
            <Pressable
              onPressIn={() => setIsPressing(true)}
              onPressOut={() => setIsPressing(false)}
              onPress={handlePressPlayOrPause}
              alignSelf="center"
              rounded="full">
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
                {isPlaying ? (
                  <LottieView
                    style={styles.speaker}
                    source={require('../../../assets/jsons/speaker-animation.json')}
                    autoPlay
                    loop
                  />
                ) : (
                  <Volume2 width={40} height={40} color="white" />
                )}
              </Animated.View>
            </Pressable>
          )}

          {recordUri && (
            <Pressable
              onPressIn={() => setIsDeleting(true)}
              onPressOut={() => setIsDeleting(false)}
              p={4}
              onPress={onDelete}>
              <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
            </Pressable>
          )}
        </HStack>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  speaker: {
    width: 40,
    height: 40,
  },
});
