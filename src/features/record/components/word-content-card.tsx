import {HStack, Image, Pressable, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Tts from 'react-native-tts';
import {SpeakerIcon} from '../../../components/icons';
import {flagMap} from '../../../configs';
import {COLORS} from '../../../constants/design-system';
import {useRootSelector} from '../../../redux/reducers';
import {Vocabulary} from '../../../types/vocabulary';
import LottieView from 'lottie-react-native';

type Props = {
  vocabulary: Vocabulary;
};

export const WordContentCard = ({vocabulary}: Props) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const nativeLanguage = useRootSelector(
    state => state.user.profile.nativeLanguage,
  )!;
  const handleSpeak = async () => {
    //en-us-x-iom-local male
    // en-us-x-iob-local" female
    Tts.addEventListener('tts-finish', event => setIsSpeaking(false));
    Tts.addEventListener('tts-start', event => {
      setIsSpeaking(true);
    });
    Tts.speak(vocabulary.text.en);
  };

  return (
    <VStack space={1}>
      <HStack alignItems="center" space={4}>
        <Text style={styles.font}>{vocabulary?.text?.en}</Text>
        {!isSpeaking ? (
          <Pressable onPress={handleSpeak}>
            <SpeakerIcon />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              Tts.stop();
              setIsSpeaking(false);
            }}>
            <LottieView
              style={styles.speaker}
              source={require('../../../assets/jsons/speaker-animation.json')}
              autoPlay
              loop
            />
          </Pressable>
        )}
      </HStack>
      <Text style={styles?.pronunciation}>/{vocabulary?.pronunciation}/</Text>
      <HStack mt={3} alignItems="center" space={2}>
        <Image
          w={6}
          h={6}
          alt={flagMap[nativeLanguage]!.alt}
          source={flagMap[nativeLanguage]!.src}
        />
        <Text style={styles.example}>{vocabulary?.text[nativeLanguage]}</Text>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  font: {
    fontWeight: '600',
    fontSize: 22,
    color: COLORS.highlight,
    flexWrap: 'wrap',
    flex: 1,
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
  speaker: {
    width: 28,
    height: 28,
  },
});
