import {HStack, Image, Pressable, VStack} from 'native-base';
import React from 'react';
import {SpeakerIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {useRootSelector} from '../../../redux/reducers';
import {Vocabulary} from '../../../types/vocabulary';
import {flagMap} from '../../../configs';
import {StyleSheet, Text} from 'react-native';
import Tts from 'react-native-tts';

type Props = {
  vocabulary: Vocabulary;
};

export const WordContentCard = ({vocabulary}: Props) => {
  const nativeLanguage = useRootSelector(
    state => state.user.profile.nativeLanguage,
  )!;
  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Text style={styles.font}>{vocabulary.text.en}</Text>
        <Pressable
          onPress={() => {
            Tts.speak(vocabulary.text.en);
          }}>
          <SpeakerIcon />
        </Pressable>
      </HStack>
      <Text style={styles.pronunciation}>/{vocabulary.pronunciation}/</Text>
      <HStack mt={3} alignItems="center" space={2}>
        <Image
          w={6}
          h={6}
          alt={flagMap[nativeLanguage]!.alt}
          source={flagMap[nativeLanguage]!.src}
        />
        <Text style={styles.example}>{vocabulary.text[nativeLanguage]}</Text>
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
    flexWrap: 'wrap',
  },
});
