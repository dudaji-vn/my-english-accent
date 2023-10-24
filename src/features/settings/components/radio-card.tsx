import {Pressable, Text, VStack, View} from 'native-base';
import {TouchableOpacity} from 'react-native';

import {COLORS} from '../../../constants/design-system';
import React from 'react';

export type Content = {
  name: string;
  icon: React.ReactNode;
};
type RadioCardProps = {
  isActive?: boolean;
  content: Content;
  onPress?: () => void;
};
export const RadioCard = ({isActive, content, onPress}: RadioCardProps) => {
  return (
    <TouchableOpacity style={{flex: 1}} onPress={onPress}>
      <VStack opacity={isActive ? 1 : 0.6} space={2}>
        <View
          shadow={isActive ? 1 : 'none'}
          borderWidth={isActive ? 1 : 0}
          borderColor={COLORS.highlight}
          justifyContent="center"
          alignItems="center"
          rounded="lg"
          bg={isActive ? 'white' : COLORS.darkerBackground}
          h={15}>
          {content.icon}
        </View>
        <Text
          fontSize="md"
          fontWeight={isActive ? 'bold' : 'normal'}
          textAlign="center"
          color={COLORS.text}>
          {content.name}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
