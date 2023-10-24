import {Button, HStack, Pressable, View} from 'native-base';
import React from 'react';
import {Animated} from 'react-native';
import {PlayIcon, TrashIcon} from '../../../components/icons';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {COLORS} from '../../../constants/design-system';
import {useModal} from '../../../hooks/use-modal';

type Props = {
  children?: React.ReactNode;
  onHasRecord?: (uri: string) => void;
  onNoRecord?: () => void;
  initialRecordUri?: string;
  onDelete?: () => void;
  onCenterPress?: () => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export const RecordCard = ({
  children,
  onHasRecord,
  onNoRecord,
  initialRecordUri,
  onDelete,
  onCenterPress,
  onLeftPress,
  onRightPress,
}: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const {close, isShowing, open} = useModal();

  const [isPressing, setIsPressing] = React.useState(false);
  const zoom = React.useRef(new Animated.Value(1)).current;

  const handlePressDelete = async () => {
    onDelete?.();
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
          <Pressable p={4}>
            <PlayIcon />
          </Pressable>
          <Pressable
            onPressIn={() => setIsPressing(true)}
            onPressOut={() => setIsPressing(false)}
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
              {/* {cacheFilePath && !isRecording && <RotateIcon />}
              {isRecording && <SoundWave value={metering * -1} />} */}
            </Animated.View>
          </Pressable>

          <Pressable p={4} onPress={handlePressDelete}>
            <TrashIcon color={isDeleting ? COLORS.error : COLORS.text} />
          </Pressable>
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
                // startRecording();
              }}>
              Record
            </Button>
          }
        />
      </Modal>
    </View>
  );
};
