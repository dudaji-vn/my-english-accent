import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import Highlighter from 'react-native-highlight-words';
import {COLORS} from '../../../constants/design-system';

import {StyleSheet} from 'react-native';
import {flagMap} from '../../../configs';
import {useRootSelector} from '../../../redux/reducers';
import {Dictionary} from '../../../types/dictionary';

type Props = {
  dictionary: Dictionary;
};

export const SentenceContentCard = ({dictionary}: Props) => {
  const nativeLanguage = useRootSelector(
    state => state.user.profile.nativeLanguage,
  )!;

  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Highlighter
          style={styles.highlight}
          highlightStyle={{
            color: COLORS.highlight,
          }}
          searchWords={[dictionary.text.en]}
          textToHighlight={dictionary.example.en}
        />
      </HStack>
      <HStack mt={3} alignItems="center" space={2}>
        <Image w={6} h={6} alt="Korean flag" source={flagMap[nativeLanguage]} />
        <Text opacity={0.6} fontSize="md" color={COLORS.text}>
          {dictionary.example[nativeLanguage]}
        </Text>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '600',
    color: COLORS.text,
    fontSize: 16,
  },
});
