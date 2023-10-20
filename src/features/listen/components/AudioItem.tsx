import {HStack, Image, Pressable, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import SpeakerIconRound from '../../../components/icons/speaker-icon-round';
import UserAvatar from '../../../components/user-avatar';
import {VNFlag, flagMap} from '../../../configs';
import {COLORS, OPACITY} from '../../../constants/design-system';
import {Record} from '../../../types/record';
import {useRootSelector} from '../../../redux/reducers';
import Player from 'react-native-audio-recorder-player';
import {getPlayerInstance} from '../../../../server/src/services/player.service';
const player = getPlayerInstance();
const fullWidth = Dimensions.get('window').width;
type RecordType = 'word' | 'sentence';
interface IAudioItemProps {
  record: Record;
  handleNext?: () => void;
}
const AudioItem = (props: IAudioItemProps) => {
  const {record, handleNext} = props;
  const isPlayAll = useRootSelector(item => item.slider.isPlayAll);

  useEffect(() => {
    console.log(isPlayAll);
    if (!isPlayAll) {
      return;
    }
    console.log(record);
    const playAudio = async () => {
      console.log('useEffect');
      if (!record) {
        return;
      }
      if (record.recordUrl.word) {
        try {
          console.log('word');
          await player.startPlayer(record.recordUrl.word);
          player.addPlayBackListener(async e => {
            if (e.currentPosition === e.duration) {
              await player.stopPlayer();
              await player.removePlayBackListener();
              if (!record.recordUrl.sentence) {
                handleNext && handleNext();
              } else {
                await player.startPlayer(record.recordUrl.sentence);
                player.addPlayBackListener(async e => {
                  if (e.currentPosition === e.duration) {
                    handleNext && handleNext();
                  }
                });
              }
            }
          });
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    };

    if (record) {
      playAudio();
    }

    return () => {
      console.log('clean up');
      player.stopPlayer();
      player.removePlayBackListener();
    };
  }, [record, isPlayAll]);

  const myNativeLanguage = useRootSelector(
    state => state.user.profile?.nativeLanguage,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const togglePlayback = async (recordType: RecordType) => {
    console.log('toggle playback call');
    if (isPlaying) {
      console.log('is playing');
      await stopPlayer();
    } else {
      if (recordType === 'word') {
        console.log('word');
        console.log(record.recordUrl.word);
        await player.startPlayer(record.recordUrl.word);
      } else {
        console.log('sentence');
        console.log(record.recordUrl.sentence);
        await player.startPlayer(record.recordUrl.sentence);
      }
      player.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          console.log('stop player call');
          stopPlayer();
        }
      });
    }
  };
  async function stopPlayer() {
    await player.stopPlayer();
    player.removePlayBackListener();
    setIsPlaying(false);
  }
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
          {record.recordUrl.word && (
            <Pressable onPress={() => togglePlayback('word')}>
              <SpeakerIconRound />
            </Pressable>
          )}
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
          {record.recordUrl.sentence && (
            <Pressable onPress={() => togglePlayback('sentence')}>
              <SpeakerIconRound />
            </Pressable>
          )}
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
