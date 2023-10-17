import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import React from 'react';
import {AlertCircle, ChevronLeft, ChevronRight, X} from 'react-native-feather';
import {PERMISSIONS, request} from 'react-native-permissions';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {COLORS} from '../../../constants/design-system';
import {useModal} from '../../../hooks/use-modal';
import {useUnsavedChange} from '../../../hooks/use-unsaved-change';
import {recordService} from '../../../services/record.service';
import {Record} from '../../../types/record';
import {uploadAudio} from '../../../utils/upload-audio';
import {RecordCard} from '../components/record-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';
import {useGetVocabularies} from '../hooks/use-get-vocabularies';
import {useWindowDimensions} from 'react-native';
import {GetVocabulariesParams} from '../../../types/vocabulary';
import {RecordedCard} from '../components/recorded-card';
import {Toast} from '../../../components/toast';
import {SCREEN_NAMES} from '../../../constants/screen';

const PAGE_SIZE = 0;

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

type TempRecord = {
  _id: string;
  uri: string;
  isSaved: boolean;
};

const WordsRecordScreen = ({navigation, route}: Props) => {
  const toast = useToast();
  const screenWith = useWindowDimensions().width;
  const filter = route.params?.filter as GetVocabulariesParams;
  const [isSaving, setIsSaving] = React.useState(false);
  const [recordedWord, setRecordedWord] = React.useState<TempRecord | null>(
    null,
  );
  const [savedList, setSavedList] = React.useState<{
    [key: string]: Record;
  }>({});

  const [recordedSentence, setRecordedSentence] =
    React.useState<TempRecord | null>(null);
  const swiperRef = React.useRef<SwiperFlatList>(null);
  const {data} = useGetVocabularies(
    {
      ...filter,
      recordStatus: 'not-recorded',
      pageSize: PAGE_SIZE,
    },
    {
      keepPreviousData: false,
      initialData: undefined,
    },
  );

  React.useEffect(() => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {});
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

  const {mutateAsync} = useMutation({
    mutationFn: recordService.createRecord,
    onSuccess: recorded => {
      setRecordedWord(null);
      setRecordedSentence(null);
      const currentIdx = swiperRef.current?.getCurrentIndex() || 0;
      const vocabularyId = data?.items[currentIdx]._id.toString();
      setSavedList(prev => ({...prev, [vocabularyId]: recorded}));
      // setTimeout(() => {
      toast.show({
        render(props) {
          return (
            <Toast {...props} status="success">
              File has been saved!
            </Toast>
          );
        },
        placement: 'bottom',
      });
      goToNext();
      // }, 100);
    },
  });
  const handleSaveRecord = async () => {
    setIsSaving(true);
    const currentIdx = swiperRef.current?.getCurrentIndex() || 0;
    const currentVocabulary = data?.items[currentIdx];

    if (!currentVocabulary) {
      // Handle the case where currentVocabulary is not available.
      return null;
    }

    const promises = [];

    if (recordedWord?.uri) {
      promises.push(
        uploadAudio({
          uri: recordedWord.uri,
          name: recordedWord._id,
          type: 'audio/m4a',
        }).then(wordRecordUri => {
          setRecordedWord(prev => ({...prev!, isSaved: true}));
          return wordRecordUri;
        }),
      );
    }

    if (recordedSentence?.uri) {
      promises.push(
        uploadAudio({
          uri: recordedSentence.uri,
          name: recordedSentence._id,
          type: 'audio/m4a',
        }).then(sentenceRecordUri => {
          setRecordedSentence(prev => ({...prev!, isSaved: true}));
          return sentenceRecordUri;
        }),
      );
    }

    const [wordRecordUri, sentenceRecordUri] = await Promise.all(promises);
    await mutateAsync({
      vocabularyId: currentVocabulary._id,
      recordUrl: {
        word: wordRecordUri,
        sentence: sentenceRecordUri,
      },
    });
    setIsSaving(false);
  };
  const goToNext = () => {
    const currentIdx = swiperRef.current?.getCurrentIndex() || 0;
    swiperRef.current?.scrollToIndex({index: currentIdx + 1});
  };

  return (
    <View bg="white" h="full">
      <Header
        hasSaved={Object.keys(savedList).length > 0}
        navigation={navigation}
        isUnsaved={isUnsaved}
        completed={Object.keys(savedList).length}
        total={data?.totalItems || 0}
        savedNumber={Object.keys(savedList).length}
      />
      <ScrollView flex={1}>
        {data && (
          <SwiperFlatList
            disableGesture
            ref={swiperRef}
            data={data?.items}
            renderItem={({item}) => (
              <VStack style={{width: screenWith}} px={5} py={2} space={5}>
                {savedList[item._id]?.recordUrl?.word ? (
                  <RecordedCard
                    recordUri={savedList[item._id]?.recordUrl?.word}>
                    <WordContentCard vocabulary={item} />
                  </RecordedCard>
                ) : (
                  <RecordCard
                    onHasRecord={uri => {
                      setRecordedWord({_id: item._id, uri, isSaved: false});
                    }}
                    onNoRecord={() => {
                      setRecordedWord(null);
                    }}>
                    <WordContentCard vocabulary={item} />
                  </RecordCard>
                )}
                {savedList[item._id]?.recordUrl?.sentence ? (
                  <RecordedCard
                    recordUri={savedList[item._id]?.recordUrl?.sentence}>
                    <SentenceContentCard vocabulary={item} />
                  </RecordedCard>
                ) : (
                  <RecordCard
                    onHasRecord={uri => {
                      setRecordedSentence({
                        _id: item._id,
                        uri,
                        isSaved: false,
                      });
                    }}
                    onNoRecord={() => {
                      setRecordedSentence(null);
                    }}>
                    <SentenceContentCard vocabulary={item} />
                  </RecordCard>
                )}
              </VStack>
            )}
          />
        )}
      </ScrollView>
      <HStack
        py={3}
        bg="white"
        zIndex={1}
        position="absolute"
        left={0}
        bottom={0}
        w="full"
        px={5}
        space={1}>
        <Button onPress={goToNext} variant="ghost">
          Skip
        </Button>
        <Button
          isLoading={isSaving}
          disabled={!recordedWord && !recordedSentence}
          opacity={!recordedWord && !recordedSentence ? 0.3 : 1}
          flex={1}
          onPress={handleSaveRecord}
          variant="outline">
          Save
        </Button>
      </HStack>
    </View>
  );
};

export default WordsRecordScreen;

const Header = ({
  navigation,
  isUnsaved,
  completed,
  total,
  hasSaved,
  savedNumber = 0,
}: {
  navigation: NavigationProp<any>;
  isUnsaved: boolean;
  completed: number;
  total: number;
  hasSaved: boolean;
  savedNumber: number;
}) => {
  const {close, isShowing, open} = useModal();
  const {onAllowGoBack} = useUnsavedChange(isUnsaved, navigation, open);
  const goBack = () => {
    if (hasSaved) {
      navigation.navigate({
        name: SCREEN_NAMES.record,
        params: {
          needRefresh: true,
          hasNewRecord: true,
          savedNumber: savedNumber,
        },
      });
      return;
    }
    navigation.goBack();
  };

  return (
    <>
      <HStack h={14} alignItems="center" justifyContent="space-between">
        <Pressable p={5} onPress={goBack}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
        <HStack space={5}>
          <ChevronLeft width={24} height={24} color={COLORS.text} />
          <Text>
            <Text color={COLORS.highlight}>{completed}</Text>/
            <Text opacity={0.3}>{total}</Text>
          </Text>
          <ChevronRight width={24} height={24} color={COLORS.text} />
        </HStack>
        <Pressable p={5} onPress={() => navigation.navigate('Home')}>
          <AlertCircle width={24} height={24} color={COLORS.text} />
        </Pressable>
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
          confirmButton={
            <Button
              onPress={() => {
                onAllowGoBack(goBack);
              }}>
              Go back
            </Button>
          }
        />
      </Modal>
    </>
  );
};
