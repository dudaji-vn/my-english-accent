import {HStack, Image, Pressable, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import SpeakerIconRound from '../../../components/icons/speaker-icon-round';
import UserAvatar from '../../../components/user-avatar';
import {VNFlag, flagMap} from '../../../configs';
import {COLORS, OPACITY} from '../../../constants/design-system';
import {Record} from '../../../types/record';
import {useRootSelector} from '../../../redux/reducers';
import Player from 'react-native-audio-recorder-player';
const player = new Player();
const fullWidth = Dimensions.get('window').width;
type RecordType = 'word' | 'sentence';
interface IAudioItemProps {
  record: Record;
  // isPlaying: boolean;
  // playAudio: () => void;
}
const AudioItem = (props: IAudioItemProps) => {
  const {record} = props;
  const myNativeLanguage = useRootSelector(
    state => state.user.profile?.nativeLanguage,
  );

  const togglePlayback = async (recordType: RecordType) => {
    if (recordType === 'word') {
      console.log('word');
      console.log(record.recordUrl.word);
      await player.startPlayer(record.recordUrl.word);
    } else {
      await player.startPlayer(record.recordUrl.sentence);
    }
  };
  const WordAudio = () => {
    return (
      <View style={styles.container} shadow={'e3'}>
        <View p={4} bg={COLORS.darkerBackground} mb={5}>
          <Text fontWeight={'700'} fontSize={32} color={COLORS.highlight}>
            {record.vocabulary.text.en}
          </Text>
          <Text opacity={OPACITY.low} mb={3}>
            /{record.vocabulary.pronunciation}/
          </Text>
          <HStack space={2}>
            {myNativeLanguage && (
              <Image
                w={6}
                h={6}
                source={flagMap[myNativeLanguage]?.src}
                alt=""
              />
            )}
            <Text opacity={OPACITY.normal}>
              {myNativeLanguage === 'ko'
                ? record.vocabulary.text.ko
                : record.vocabulary.text.vi}
            </Text>
          </HStack>
        </View>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack space={2} alignItems={'center'}>
            <UserAvatar
              imageUrl={record.user.avatar}
              flagWidth={2}
              width={6}
              height={6}
              nativeLanguage={record.user.nativeLanguage}
            />
            <Text>{record.user.displayName}</Text>
          </HStack>
          <Pressable onPress={() => togglePlayback('word')}>
            <SpeakerIconRound />
          </Pressable>
        </HStack>
      </View>
    );
  };
  const SentencesAudio = () => {
    return (
      <View style={styles.container} shadow={'e3'}>
        <View p={4} bg={COLORS.darkerBackground} mb={5}>
          <Text fontSize={20}>{record.vocabulary.example.en}</Text>

          <HStack alignItems={'center'} space={2}>
            {myNativeLanguage && (
              <Image
                w={6}
                h={6}
                source={flagMap[myNativeLanguage]?.src}
                alt=""
              />
            )}
            <Text paddingRight={6} opacity={OPACITY.normal}>
              {myNativeLanguage === 'ko'
                ? record.vocabulary.example.ko
                : record.vocabulary.example.vi}
            </Text>
          </HStack>
        </View>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack space={2} alignItems={'center'}>
            <UserAvatar
              imageUrl={record.user.avatar}
              flagWidth={2}
              width={6}
              height={6}
              nativeLanguage={record.user.nativeLanguage}
            />
            <Text>{record.user.displayName}</Text>
          </HStack>
          <Pressable onPress={() => togglePlayback('sentence')}>
            <SpeakerIconRound />
          </Pressable>
        </HStack>
      </View>
    );
  };
  return (
    <View>
      <View mb={10}>
        <WordAudio />
      </View>
      <View mb={10}>
        <SentencesAudio />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: fullWidth - 40,
    borderRadius: 8,
    padding: 20,
    backgroundColor: COLORS.lighterBackground,
  },
});
export default AudioItem;
