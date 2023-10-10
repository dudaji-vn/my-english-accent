import {HStack, Image, Progress, Text, VStack, View} from 'native-base';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {COLORS} from '../../constants/design-system';
export type Topic = {
  name: string;
  image: ImageSourcePropType;
  description: string;
  totalWords: number;
  numOfAchieved: number;
};
type Props = {
  topic: Topic;
  isActive?: boolean;
};

export const TopicCard = (props: Props) => {
  return (
    <View
      borderWidth={1}
      borderColor={props.isActive ? COLORS.highlight : COLORS.lighterBackground}
      p={4}
      rounded="lg"
      bg={COLORS.lighterBackground}>
      <HStack space={4}>
        <Image source={props.topic.image} alt="image" h={10} w={10} />
        <VStack>
          <Text fontWeight="medium">{props.topic.name}</Text>
          <Text fontWeight="normal">{props.topic.totalWords + ' words'}</Text>
        </VStack>
      </HStack>
      <Progress
        _filledTrack={{
          bg: COLORS.highlight,
        }}
        mt={4}
        value={(props.topic.numOfAchieved / props.topic.totalWords) * 100}
      />
    </View>
  );
};
