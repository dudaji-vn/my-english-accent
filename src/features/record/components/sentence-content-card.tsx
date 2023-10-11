import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import Highlighter from 'react-native-highlight-words';
import {COLORS} from '../../../constants/design-system';
import {Dictionary} from '../../../types/dictionary';
const VNFlag = require('../../../assets/images/VietNamFlagIcon.png');

type Props = {
  dictionary: Dictionary;
};

export const SentenceContentCard = ({dictionary}: Props) => {
  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Highlighter
          style={{
            fontWeight: 400,
            color: COLORS.text,
            fontSize: 16,
          }}
          highlightStyle={{
            color: COLORS.highlight,
          }}
          searchWords={[dictionary.text]}
          textToHighlight={dictionary.example}
        />
      </HStack>
      <HStack mt={3} alignItems="center" space={2}>
        <Image w={8} h={8} alt="Korean flag" source={VNFlag} />
        <Text opacity={0.6} fontSize="md" color={COLORS.text}>
          {dictionary.exampleVI}
        </Text>
      </HStack>
    </VStack>
  );
};
