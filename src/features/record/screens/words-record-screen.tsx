import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  Button,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import React from 'react';
import {StyleSheet, Text as TextDf, useWindowDimensions} from 'react-native';
import {ChevronLeft, ChevronRight, X} from 'react-native-feather';
import {PERMISSIONS, request} from 'react-native-permissions';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {MicCheckIcon} from '../../../components/icons';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {LoadingScreen} from '../../../components/screens';
import {TabBar, TabDataItem} from '../../../components/tab-bar';
import {Toast} from '../../../components/toast';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useModal} from '../../../hooks/use-modal';
import {useUnsavedChange} from '../../../hooks/use-unsaved-change';
import {recordService} from '../../../services/record.service';
import {Record} from '../../../types/record';
import {GetVocabulariesParams} from '../../../types/vocabulary';
import {uploadAudio} from '../../../utils/upload-audio';
import {RecordCard} from '../components/record-card';
import {RecordedCard} from '../components/recorded-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';
import {useGetVocabularies} from '../hooks/use-get-vocabularies';
import {useDispatch} from 'react-redux';
import {addCompletedId} from '../../../redux/reducers/record.reducer';

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

const tabItems: TabDataItem[] = [
  {
    title: 'Word',
    value: 'word',
  },
  {
    title: 'Sentence',
    value: 'sentence',
  },
  {
    title: 'Both',
    value: 'both',
  },
];

const WordsRecordScreen = ({navigation, route}: Props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const filter = route.params?.filter as GetVocabulariesParams;
  const refreshKey = route.params?.refreshKey;
  const [footerHeight] = React.useState(144);
  const [headerHeight] = React.useState(121.81818389892578);
  const screenWith = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isSaving, setIsSaving] = React.useState(false);
  const [recordedWord, setRecordedWord] = React.useState<TempRecord | null>(
    null,
  );
  const [savedList, setSavedList] = React.useState<{
    [key: string]: Record;
  }>({});

  const [typeRecord, setTypeRecord] = React.useState<
    'word' | 'sentence' | 'both'
  >('word');

  const [recordedSentence, setRecordedSentence] =
    React.useState<TempRecord | null>(null);
  const swiperRef = React.useRef<SwiperFlatList>(null);
  const {data, isFetching} = useGetVocabularies(
    {
      ...filter,
      recordStatus: 'not-recorded',
      pageSize: PAGE_SIZE,
    },
    'record',
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
      dispatch(addCompletedId(recorded._id));
      queryClient.invalidateQueries(refreshKey);
      queryClient.invalidateQueries(['progress']);
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

  if (isFetching) {
    return <LoadingScreen />;
  }

  const forward = () => {
    const currentIdx = swiperRef.current?.getCurrentIndex() || 0;
    swiperRef.current?.scrollToIndex({index: currentIdx + 1});
  };
  const backward = () => {
    const currentIdx = swiperRef.current?.getCurrentIndex() || 0;
    swiperRef.current?.scrollToIndex({index: currentIdx - 1});
  };

  const showWord = typeRecord === 'word' || typeRecord === 'both';
  const showSentence = typeRecord === 'sentence' || typeRecord === 'both';

  return (
    <View bg="white" h="full">
      <Image
        position="absolute"
        bottom={0}
        w="full"
        height="full"
        source={require('../../../assets/images/wave-background.png')}
      />

      <View
      // onLayout={event => {
      //   // const {height} = event.nativeEvent.layout;
      //   // console.log('height h', height);
      //   // if (height && height !== 0) setHeaderHeight(height);
      // }}
      >
        <Header
          forward={forward}
          backward={backward}
          currentIdx={currentIdx}
          hasSaved={Object.keys(savedList).length > 0}
          navigation={navigation}
          isUnsaved={isUnsaved}
          completed={Object.keys(savedList).length}
          total={data?.totalItems || 0}
        />
        <View mb={6} justifyContent="center" alignItems="center">
          <TabBar
            onValueChange={value => {
              setTypeRecord(value as 'word' | 'sentence' | 'both');
            }}
            tabItems={tabItems}
            value={typeRecord}
          />
        </View>
      </View>

      {data && (
        <SwiperFlatList
          onChangeIndex={({index}) => {
            setCurrentIdx(index);
          }}
          disableGesture
          ref={swiperRef}
          data={data?.items}
          renderItem={({item}) => (
            <ScrollView
              contentContainerStyle={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  justifyContent: 'center',
                  paddingBottom: 20,
                },
                !(showWord && showSentence) && {
                  height: screenHeight - footerHeight - headerHeight,
                },
              ]}
              style={{
                width: screenWith,
                height: screenHeight - footerHeight - headerHeight,
              }}>
              <VStack mb={4} justifyContent="center" px={5} py={2} space={5}>
                {showWord && (
                  <>
                    {savedList[item._id]?.recordUrl?.word ? (
                      <RecordedCard
                        recordUri={savedList[item._id]?.recordUrl?.word}>
                        <WordContentCard vocabulary={item} />
                      </RecordedCard>
                    ) : (
                      <RecordCard
                        onHasRecord={uri => {
                          setRecordedWord({
                            _id: item._id,
                            uri,
                            isSaved: false,
                          });
                        }}
                        onNoRecord={() => {
                          setRecordedWord(null);
                        }}>
                        <WordContentCard vocabulary={item} />
                      </RecordCard>
                    )}
                  </>
                )}

                {showSentence && (
                  <>
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
                  </>
                )}
              </VStack>
            </ScrollView>
          )}
        />
      )}

      <HStack
        flexShrink={0}
        // onLayout={event => {
        //   const {height} = event.nativeEvent.layout;
        //   console.log('height f', height);
        //   if (height && height !== 0) setFooterHeight(height);
        // }}
        py={8}
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
          onPress={handleSaveRecord}>
          <Text color="white">Save</Text>
        </Button>
      </HStack>
    </View>
  );
};

export default WordsRecordScreen;

const Header = ({
  currentIdx = 0,
  navigation,
  isUnsaved,
  completed,
  total,
  hasSaved,
  forward,
  backward,
}: {
  currentIdx?: number;
  navigation: NavigationProp<any>;
  isUnsaved: boolean;
  completed: number;
  total: number;
  hasSaved: boolean;
  forward: () => void;
  backward: () => void;
}) => {
  const {close, isShowing, open} = useModal();
  const {onAllowGoBack} = useUnsavedChange(isUnsaved, navigation, open);
  const goBack = () => {
    if (hasSaved) {
      navigation.navigate({
        name: SCREEN_NAMES.record,
        params: {
          hasNewRecord: true,
          savedNumber: completed,
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
          <Pressable onPress={backward}>
            <ChevronLeft
              opacity={currentIdx === 0 ? 0.3 : 0.6}
              width={24}
              height={24}
              color={COLORS.text}
            />
          </Pressable>
          <HStack>
            <Text fontWeight="medium" opacity={0.6} color={COLORS.text}>
              {currentIdx + 1}
            </Text>
            <Text fontWeight="medium" opacity={0.3}>
              /{total}
            </Text>
          </HStack>
          <Pressable onPress={forward}>
            <ChevronRight
              opacity={currentIdx === total - 1 ? 0.3 : 0.6}
              width={24}
              height={24}
              color={COLORS.text}
            />
          </Pressable>
        </HStack>

        <HStack space={1} mr={5} alignItems="center">
          <TextDf style={styles.text}>{completed}</TextDf>
          <Text>
            <MicCheckIcon />
          </Text>
        </HStack>
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

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.highlight,
  },
});
