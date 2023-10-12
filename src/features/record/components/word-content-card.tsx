import {HStack, Image, Pressable, VStack} from 'native-base';
import React from 'react';
import {SpeakerIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {useRootSelector} from '../../../redux/reducers';
import {Dictionary} from '../../../types/dictionary';
import {flagMap} from '../../../configs';
import {StyleSheet, Text} from 'react-native';

type Props = {
  dictionary: Dictionary;
};

export const WordContentCard = ({dictionary}: Props) => {
  const nativeLanguage = useRootSelector(
    state => state.user.profile.nativeLanguage,
  )!;
  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Text style={styles.font}>{dictionary.text.en}</Text>
        <Pressable>
          <SpeakerIcon />
        </Pressable>
      </HStack>
      <Text style={styles.pronunciation}>/{dictionary.pronunciation}/</Text>
      <HStack mt={3} alignItems="center" space={2}>
        <Image w={6} h={6} alt="Korean flag" source={flagMap[nativeLanguage]} />
        <Text style={styles.example}>{dictionary.text[nativeLanguage]}</Text>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  font: {
    fontWeight: '600',
    fontSize: 22,
    color: COLORS.highlight,
  },
  pronunciation: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.3,
  },
  example: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.6,
  },
});
