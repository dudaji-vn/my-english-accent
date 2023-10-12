import {NavigationProp} from '@react-navigation/native';
import {Button, HStack, Pressable, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {AlertCircle, ChevronLeft, ChevronRight, X} from 'react-native-feather';
import {COLORS} from '../../../constants/design-system';
import {useUnsavedChange} from '../../../hooks/use-unsaved-change';
import {useModal} from '../../../hooks/use-modal';
import {ModalCard} from '../../../components/modal-card';
import {Modal} from '../../../components/modal';
import {RecordCard} from '../components/record-card';
import {WordContentCard} from '../components/word-content-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {request, PERMISSIONS} from 'react-native-permissions';

type Props = {
  navigation: NavigationProp<any>;
};
const dictionary = {
  id: '1',
  text: {en: 'Hi', vi: 'Xin chào', ko: '안녕하세요'},
  example: {
    en: 'Hi, my name is John',
    vi: 'Xin chào, tôi là John',
    ko: '안녕하세요, 제 이름은 John입니다',
  },
  pronunciation: 'haɪ',
  category: 'greeting',
  wordType: 'noun',
};
const WordsRecordScreen = ({navigation}: Props) => {
  const {close, isShowing, open} = useModal();
  const [recordedWord, setRecordedWord] = React.useState<{
    id: string;
    uri: string;
    isSaved: boolean;
  } | null>(null);
  const [recordedSentence, setRecordedSentence] = React.useState<{
    id: string;
    uri: string;
    isSaved: boolean;
  } | null>(null);

  React.useEffect(() => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
      console.log(result);
    });
  }, []);
  const isUnsaved = React.useMemo(() => {
    if (!recordedWord && !recordedSentence) {
      return false;
    } else if (recordedWord && recordedSentence) {
      return !recordedWord.isSaved || !recordedSentence.isSaved;
    } else {
      return !(recordedWord ? recordedWord.isSaved : recordedSentence?.isSaved);
    }
  }, [recordedWord, recordedSentence]);

  const {onAllowGoBack} = useUnsavedChange(isUnsaved, navigation, open);

  return (
    <ScrollView bg="white">
      <HStack h={14} alignItems="center" justifyContent="space-between" px={5}>
        <Pressable p={4} onPress={navigation.goBack}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
        <HStack space={5}>
          <ChevronLeft width={24} height={24} color={COLORS.text} />
          <Text>
            <Text color={COLORS.highlight}>20</Text>/
            <Text opacity={0.3}>40</Text>
          </Text>
          <ChevronRight width={24} height={24} color={COLORS.text} />
        </HStack>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <AlertCircle width={24} height={24} color={COLORS.text} />
        </Pressable>
      </HStack>
      <VStack m={5} mt={1} space={5}>
        <RecordCard
          onHasRecord={uri => {
            console.log(uri);
            setRecordedWord({id: dictionary.id, uri, isSaved: false});
          }}
          onNoRecord={() => {
            setRecordedWord(null);
          }}>
          <WordContentCard dictionary={dictionary} />
        </RecordCard>
        <RecordCard
          onHasRecord={uri => {
            console.log(uri);
            setRecordedSentence({id: dictionary.id, uri, isSaved: false});
          }}
          onNoRecord={() => {
            setRecordedSentence(null);
          }}>
          <SentenceContentCard dictionary={dictionary} />
        </RecordCard>
      </VStack>
      <HStack mt={5} mx={5} space={1}>
        <Button onPress={open} variant="ghost">
          Skip
        </Button>
        <Button
          disabled={!recordedWord && !recordedSentence}
          opacity={!recordedWord && !recordedSentence ? 0.3 : 1}
          flex={1}
          onPress={() => {
            if (recordedWord) {
              setRecordedWord(prev => ({...prev!, isSaved: true}));
            }
            if (recordedSentence) {
              setRecordedSentence(prev => ({...prev!, isSaved: true}));
            }
          }}
          variant="outline">
          Save
        </Button>
      </HStack>
      <Modal isOpen={isShowing} onClose={close}>
        <ModalCard
          title="Go back?"
          description="Are you sure to go back. Your record won’t be saved."
          cancelButton={
            <Button onPress={close} variant="outline">
              Cancel
            </Button>
          }
          confirmButton={<Button onPress={onAllowGoBack}>Go back</Button>}
        />
      </Modal>
    </ScrollView>
  );
};

export default WordsRecordScreen;
