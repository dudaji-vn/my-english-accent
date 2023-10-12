import {HStack, Image, Progress, Text, VStack, View} from 'native-base';
import React, {useMemo} from 'react';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
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
  minimalOnInActive?: boolean;
};

export const TopicCard = (props: Props) => {
  const showContent = props.isActive
    ? true
    : props.minimalOnInActive
    ? false
    : true;
  const numText = useMemo(() => {
    const unit = props.topic.totalWords > 1 ? 'words' : 'word';
    const numDisplay =
      props.topic.totalWords > 99 ? '99+' : props.topic.totalWords;
    return `${numDisplay} ${unit}`;
  }, [props.topic.totalWords]);

  return (
    <TouchableOpacity
      disabled={props.isActive}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: props.minimalOnInActive ? 0 : 1,
      }}>
      <View
        opacity={props.isActive ? 1 : 0.3}
        borderWidth={1}
        borderColor={props.isActive ? COLORS.highlight : COLORS.stroke}
        px={4}
        py={3}
        rounded="lg"
        bg={COLORS.background}>
        <HStack space={4}>
          <Image source={props.topic.image} alt="image" h={10} w={10} />
          {showContent && (
            <VStack>
              <Text lineHeight="xs" fontWeight="medium" fontSize="lg">
                {props.topic.name}
              </Text>
              <Text lineHeight="xs" fontWeight="normal">
                {numText}
              </Text>
            </VStack>
          )}
        </HStack>
        <Progress
          _filledTrack={{
            bg: COLORS.highlight,
          }}
          mt={4}
          value={(props.topic.numOfAchieved / props.topic.totalWords) * 100}
        />
      </View>
    </TouchableOpacity>
  );
};
