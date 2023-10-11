import {HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {SpeakerIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
const VNFlag = require('../../../assets/images/VietNamFlagIcon.png');

type Props = {
  word: {
    text: string;
    pronunciation: string;
    meaning: string;
  };
};

export const WordContentCard = ({word}: Props) => {
  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Text fontSize="2xl" fontWeight="semibold" color={COLORS.highlight}>
          {word.text}
        </Text>
        <Pressable>
          <SpeakerIcon />
        </Pressable>
      </HStack>
      <Text fontSize="md" opacity={0.3} color={COLORS.text}>
        /{word.pronunciation}/
      </Text>
      <HStack mt={3} alignItems="center" space={2}>
        <Image w={8} h={8} alt="Korean flag" source={VNFlag} />
        <Text opacity={0.6} fontSize="md" color={COLORS.text}>
          {word.meaning}
        </Text>
      </HStack>
    </VStack>
  );
};
