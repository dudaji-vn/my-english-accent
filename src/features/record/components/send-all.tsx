import React from 'react';
import {Send} from 'react-native-feather';
import {COLORS} from '../../../constants/design-system';
import {HStack, Text, Pressable} from 'native-base';
import {Modal} from '../../../components/modal';
import {ShareModal} from '../../../components/share-modal';
import {useModal} from '../../../hooks/use-modal';

export const SendAllButton = ({onPress}: {onPress?: () => void}) => {
  const [color, setColor] = React.useState(COLORS.text);
  const [opacity, setOpacity] = React.useState(0.6);
  const {close, open, isShowing} = useModal();
  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
        open();
      }}
      opacity={opacity}
      onPressIn={() => {
        setColor(COLORS.highlight);
        setOpacity(1);
      }}
      onPressOut={() => {
        setColor(COLORS.text);
        setOpacity(0.6);
      }}>
      <HStack>
        <Send width={24} height={24} color={color} />
        <Text ml={2} fontWeight="semibold" color={color}>
          Send all files
        </Text>
      </HStack>
      <Modal onClose={close} isOpen={isShowing}>
        <ShareModal onDone={close} isSendAll recordId={''} />
      </Modal>
    </Pressable>
  );
};
