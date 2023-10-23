import {HStack, Image, Pressable, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {getPlayerInstance} from '../../../../server/src/services/player.service';
import SpeakerIconRound from '../../../components/icons/speaker-icon-round';
import LottiePlaying from '../../../components/lottie-playing';
import UserAvatar from '../../../components/user-avatar';
import {flagMap} from '../../../configs';
import {COLORS, OPACITY} from '../../../constants/design-system';
import {useRootSelector} from '../../../redux/reducers';
import {Record} from '../../../types/record';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {listenService} from '../../../services/listen.service';
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
  const [isListened, setIsListened] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: listenService.listenRecord,
    onSuccess: data => {
      console.log('call api success');
      queryClient.invalidateQueries({queryKey: ['listen-user-progress']});
    },
    onError: (error, variables) => {
      console.log('create group error', error, variables);
    },
  });
  useEffect(() => {
    if (record && record._id && isListened) {
      mutate(record._id);
    }
  }, [isListened]);
  useEffect(() => {
    if (!isPlayAll) {
      return;
    }

    const playAudio = async () => {
      console.log('useEffect');
      if (!record) {
        return;
      }
      if (record.recordUrl.word) {
        try {
          console.log('word');
          setIsPlayingWord(true);
          await player.startPlayer(record.recordUrl.word);

          player.addPlayBackListener(async e => {
            if (e.currentPosition === e.duration) {
              setIsListened(true);
              await player.stopPlayer();
              setIsPlayingWord(false);
              await player.removePlayBackListener();
              if (!record.recordUrl.sentence) {
                handleNext && handleNext();
              } else {
                setIsPlayingSentence(true);
                await player.startPlayer(record.recordUrl.sentence);
                player.addPlayBackListener(async e => {
                  if (e.currentPosition === e.duration) {
                    setIsListened(true);
                    setIsPlayingSentence(false);
                    handleNext && handleNext();
                  }
                });
              }
            }
          });
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      } else {
        if (!record.recordUrl.sentence) {
          handleNext && handleNext();
        } else {
          setIsPlayingSentence(true);
          await player.startPlayer(record.recordUrl.sentence);
          player.addPlayBackListener(async e => {
            if (e.currentPosition === e.duration) {
              setIsListened(true);
              setIsPlayingSentence(false);
              handleNext && handleNext();
            }
          });
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
  const [isPlayingWord, setIsPlayingWord] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);
  const togglePlayback = async (recordType: RecordType) => {
    console.log('toggle playback call');
    if (isPlayingWord || isPlayingSentence) {
      console.log('is playing');
      await stopPlayer();
    } else {
      if (recordType === 'word') {
        console.log('word');
        setIsPlayingWord(!isPlayingWord);
        console.log(record.recordUrl.word);
        await player.startPlayer(record.recordUrl.word);
      } else {
        setIsPlayingSentence(!isPlayingSentence);
        console.log('sentence');
        console.log(record.recordUrl.sentence);
        await player.startPlayer(record.recordUrl.sentence);
      }
      player.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          setIsListened(true);
          console.log('stop player call');

          stopPlayer();
        }
      });
    }
  };
  async function stopPlayer() {
    await player.stopPlayer();
    player.removePlayBackListener();
    setIsPlayingWord(false);
    setIsPlayingSentence(false);
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
              {isPlayingWord ? <LottiePlaying /> : <SpeakerIconRound />}
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
              {isPlayingSentence ? <LottiePlaying /> : <SpeakerIconRound />}
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
