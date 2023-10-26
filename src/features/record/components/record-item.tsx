import {HStack, View} from 'native-base';
import React from 'react';
import {Send, Trash2} from 'react-native-feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
import {useChangeColorPress} from '../../../hooks/use-change-color-press';
import {Record} from '../../../types/record';
import {PressableIcon} from '../../../components/pressable-icon';

type Props = {
  item: Record;
  isNew?: boolean;
  onPress: (item: Record) => void;
  onDelete: () => void;
  onSend: () => void;
};

export const RecordItem = ({
  item,
  onPress,
  isNew = false,
  onDelete,
  onSend,
}: Props) => {
  const swipeableRef = React.useRef<Swipeable>(null);
  const {color, handlePressIn, handlePressOut} = useChangeColorPress(
    COLORS.text,
    COLORS.highlight,
  );
  const {
    color: colorDelete,
    handlePressIn: handlePressInDelete,
    handlePressOut: handlePressOutDelete,
  } = useChangeColorPress(COLORS.text, COLORS.error);

  return (
    <View bg={COLORS.darkerBackground} rounded="lg">
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => {
          return (
            <HStack rounded="lg" h="full">
              <PressableIcon
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => {
                  onSend();
                  setTimeout(() => {
                    swipeableRef.current?.close();
                  }, 500);
                }}
                justifyContent="center"
                alignItems="center"
                h="full"
                bg={COLORS.darkerBackground}>
                <Send opacity={0.6} width={24} height={24} color={color} />
              </PressableIcon>
              <PressableIcon
                onPressIn={handlePressInDelete}
                onPressOut={handlePressOutDelete}
                onPress={() => {
                  onDelete();
                  setTimeout(() => {
                    swipeableRef.current?.close();
                  }, 500);
                }}
                roundedRight="lg"
                justifyContent="center"
                alignItems="center"
                h="full"
                bg={COLORS.darkerBackground}>
                <Trash2
                  opacity={0.6}
                  width={24}
                  height={24}
                  color={colorDelete}
                />
              </PressableIcon>
            </HStack>
          );
        }}>
        <WordItem
          leftElement={
            isNew ? (
              <View mr={2} w={3} h={3} rounded="full" bg={COLORS.highlight} />
            ) : undefined
          }
          onPress={() => onPress(item)}
          key={item._id}
          word={item.vocabulary.text.en}
          status="default"
        />
      </Swipeable>
    </View>
  );
};
