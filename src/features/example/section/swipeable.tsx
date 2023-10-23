import {HStack, Pressable, View} from 'native-base';
import React from 'react';
import {Send, Trash2} from 'react-native-feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
type Props = {};

export const SwipeableSection = (props: Props) => {
  return (
    <View>
      <View bg={COLORS.darkerBackground}>
        <Swipeable
          renderRightActions={() => {
            return (
              <HStack h="full">
                <Pressable
                  justifyContent="center"
                  alignItems="center"
                  h="full"
                  px={3}
                  bg={COLORS.darkerBackground}>
                  <Send
                    opacity={0.6}
                    width={24}
                    height={24}
                    color={COLORS.primary}
                  />
                </Pressable>
                <Pressable
                  justifyContent="center"
                  alignItems="center"
                  h="full"
                  px={3}
                  bg={COLORS.darkerBackground}>
                  <Trash2
                    opacity={0.6}
                    width={24}
                    height={24}
                    color={COLORS.error}
                  />
                </Pressable>
              </HStack>
            );
          }}>
          <WordItem word="Hello" />
        </Swipeable>
      </View>
    </View>
  );
};
