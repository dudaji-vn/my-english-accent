import {Button, HStack, Pressable, View} from 'native-base';
import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {
  PauseIcon,
  PlayIcon,
  RotateIcon,
  TrashIcon,
} from '../../../components/icons';
import {SoundWave} from '../../../components/sound-wave';
import {COLORS} from '../../../constants/design-system';
import {useAudioRecord} from '../../../hooks/use-audio-record';
import {useModal} from '../../../hooks/use-modal';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {PressableIcon} from '../../../components/pressable-icon';

type Props = {
  children?: React.ReactNode;
  onHasRecord?: (uri: string) => void;
  onNoRecord?: () => void;
  initialRecordUri?: string;
  onDelete?: () => void;
};
// Define an interface for the exposed methods
export interface RecordCardMethods {
  handlePressDelete: () => void;
}
export const RecordCard = React.forwardRef<RecordCardMethods, Props>(
  (
    {children, onHasRecord, onNoRecord, initialRecordUri, onDelete}: Props,
    ref,
  ) => {
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
    } = useAudioRecord(initialRecordUri ? initialRecordUri : undefined);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const {close, isShowing, open} = useModal();

    const [isPressing, setIsPressing] = React.useState(false);
    const zoom = React.useRef(new Animated.Value(1)).current;
    const handlePressRecord = async () => {
      if (!isRecording) {
        if (cacheFilePath) {
          open();
          return;
        }
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
      onDelete?.();
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

    React.useEffect(() => {
      return () => {
        stopPlayer();
        stopRecording();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Use useImperativeHandle to expose the function
    React.useImperativeHandle(ref, () => ({
      handlePressDelete,
    }));

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
            <PressableIcon
              disabled={!cacheFilePath || isRecording}
              opacity={!cacheFilePath || isRecording ? 0 : 1}
              onPress={handlePressPlayOrPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </PressableIcon>
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
                {cacheFilePath && !isRecording && <RotateIcon />}
                {isRecording && <SoundWave value={metering * -1} />}
              </Animated.View>
            </Pressable>

            <PressableIcon
              disabled={!cacheFilePath || isRecording}
              opacity={!cacheFilePath || isRecording ? 0 : 1}
              onPress={handlePressDelete}>
              <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
            </PressableIcon>
          </HStack>
        </View>
        <Modal isOpen={isShowing} onClose={close}>
          <ModalCard
            title="Overwrite!"
            description="This action will overwrite your last recorded sound with the next one. Are you sure to overwrite it?"
            cancelButton={
              <Button onPress={close} variant="outline">
                Cancel
              </Button>
            }
            confirmButton={
              <Button
                onPress={() => {
                  close();
                  startRecording();
                }}>
                Record
              </Button>
            }
          />
        </Modal>
      </View>
    );
  },
);
