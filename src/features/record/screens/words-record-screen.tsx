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
import {useDispatch} from 'react-redux';
import {MicCheckIcon} from '../../../components/icons';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {LoadingScreen, PermissionScreen} from '../../../components/screens';
import {TabBar, TabDataItem} from '../../../components/tab-bar';
import {Toast} from '../../../components/toast';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useModal} from '../../../hooks/use-modal';
import {useUnsavedChange} from '../../../hooks/use-unsaved-change';
import {addCompletedId} from '../../../redux/reducers/record.reducer';
import {recordService} from '../../../services/record.service';
import {Record} from '../../../types/record';
import {GetVocabulariesParams, Vocabulary} from '../../../types/vocabulary';
import {uploadAudio} from '../../../utils/upload-audio';
import {RecordCard} from '../components/record-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';
import {useGetVocabularies} from '../hooks/use-get-vocabularies';
import Swiper from 'react-native-swiper';
import SwiperDeck from 'react-native-deck-swiper';
import {Text600} from '../../../components/text-600';
import {CompleteRecordScreen} from './complete-record-screen';

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
  const firstVocabulary = route.params?.firstVocabulary as Vocabulary;
  // const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const filter = route.params?.filter as GetVocabulariesParams;
  const refreshKey = route.params?.refreshKey;
  const swiperRef = React.useRef<Swiper>(null);
  const swiperDeckRef = React.useRef<SwiperDeck<Vocabulary>>(null);
  const [footerHeight] = React.useState(144);
  const [headerHeight] = React.useState(121.81818389892578);
  const screenWith = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isMicPermissionGranted, setIsMicPermissionGranted] =
    React.useState(true);

  const [recordedWord, setRecordedWord] = React.useState<TempRecord | null>(
    null,
  );
  const [savedList, setSavedList] = React.useState<{
    [key: string]: Record;
  }>({});

  const [tabIndex, setTabIndex] = React.useState(0);

  const [recordedSentence, setRecordedSentence] =
    React.useState<TempRecord | null>(null);

  const {data, isFetching} = useGetVocabularies(
    {
      ...filter,
      recordStatus: 'not-recorded',
      pageSize: PAGE_SIZE,
    },
    'record',
  );

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
      setTimeout(() => {
        const vocabularyId: string = data?.items[currentIdx]._id as string;
        setSavedList(prev => ({...prev, [vocabularyId]: recorded}));
        dispatch(addCompletedId(recorded._id));
        queryClient.invalidateQueries(refreshKey);
        queryClient.invalidateQueries(['progress']);
        forward();
        // toast.show({
        //   render(props) {
        //     return (
        //       <Toast {...props} status="success">
        //         File has been saved!
        //       </Toast>
        //     );
        //   },
        //   placement: 'bottom',
        // });
      }, 100);
    },
  });
  const handleSaveRecord = async () => {
    setIsSaving(true);
    const currentVocabulary = data?.items[currentIdx];
    if (!currentVocabulary) {
      // Handle the case where currentVocabulary is not available.
      return null;
    }

    const promises = [];

    if (recordedWord?.uri) {
      promises.push(
        uploadAudio(recordedWord.uri).then(wordRecordUri => {
          setRecordedWord(prev => ({...prev!, isSaved: true}));
          return wordRecordUri;
        }),
      );
    }

    if (recordedSentence?.uri) {
      promises.push(
        uploadAudio(recordedSentence.uri).then(sentenceRecordUri => {
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
  React.useEffect(() => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
      if (result === 'granted') {
        setIsMicPermissionGranted(true);
        return;
      }
      setIsMicPermissionGranted(false);
    });
  }, []);

  const vocabularies = React.useMemo(() => {
    // add first vocabulary in first list and remove the duplicate if hav
    const newVocabularies = data?.items || [];
    if (firstVocabulary) {
      const idx = newVocabularies.findIndex(
        item => item._id === firstVocabulary._id,
      );
      if (idx !== -1) {
        newVocabularies.splice(idx, 1);
      }
      newVocabularies.unshift(firstVocabulary);
    }
    return newVocabularies;
  }, [data?.items, firstVocabulary]);

  if (!isMicPermissionGranted) {
    return (
      <PermissionScreen
        imageSource={require('../../../assets/images/permission-bot.png')}
        title="Mic & Audio permission"
        subTitle={
          <Text>
            To access this feature, you have to allow “<Text600>Record</Text600>
            ” and “<Text600>Audio</Text600>” permission
          </Text>
        }
        subTitle2="After allowed permission, you can return and use app normally">
        <View my={10} opacity={0.6}>
          <Text600 style={styles.textStep}>
            1. Click “Go to setting” to open system’s setting app
          </Text600>
          <Text600 style={styles.textStep}>2. Choose “Permission”</Text600>
          <Text600 style={styles.textStep}>
            3. Allow “Mic” & “Audio” permission
          </Text600>
        </View>
      </PermissionScreen>
    );
  }

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (Object.keys(savedList).length === data?.items.length) {
    return <CompleteRecordScreen navigation={navigation} />;
  }

  const forward = () => {
    if (data?.items?.length && currentIdx === data.items.length - 1) {
      const firstUnsavedIdx = data.items.findIndex(
        item => !savedList[item._id],
      );
      if (firstUnsavedIdx === -1) {
        return;
      }
      swiperDeckRef.current?.jumpToCardIndex(firstUnsavedIdx);
      setCurrentIdx(firstUnsavedIdx);
      return;
    }
    swiperDeckRef.current?.swipeLeft();
  };
  const backward = () => {
    if (currentIdx === 0) {
      return;
    }
    swiperDeckRef.current?.swipeRight();
  };

  const mainHeight = screenHeight - footerHeight - headerHeight;

  return (
    <View bg="white" h="full">
      <Image
        position="absolute"
        bottom={0}
        w="full"
        height="full"
        source={require('../../../assets/images/wave-background.png')}
      />

      <View>
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
              const activeIndex = tabItems.findIndex(
                item => item.value === value,
              );
              setTabIndex(activeIndex);
              swiperRef.current?.scrollTo(activeIndex);
            }}
            tabItems={tabItems}
            value={tabItems[tabIndex].value}
          />
        </View>
      </View>

      <View>
        <SwiperDeck
          stackSize={1}
          containerStyle={[
            styles.swiperDeckContainer,
            {
              width: screenWith,
              height: mainHeight,
            },
          ]}
          cardStyle={[
            styles.swiperDeckCard,
            {
              width: screenWith,
              height: mainHeight,
            },
          ]}
          onSwipedLeft={cardIndex => {
            setCurrentIdx(
              cardIndex === vocabularies.length - 1 ? cardIndex : cardIndex + 1,
            );
          }}
          onSwipedRight={cardIndex => {
            if (cardIndex > vocabularies.length - 1) {
              return;
            }
            setCurrentIdx(cardIndex === 0 ? cardIndex : cardIndex - 1);
          }}
          goBackToPreviousCardOnSwipeRight={true}
          showSecondCard={false}
          horizontalSwipe={false}
          verticalSwipe={false}
          ref={swiperDeckRef}
          cards={data?.items || []}
          renderCard={item => {
            return (
              <Swiper
                index={tabIndex}
                ref={swiperRef}
                onIndexChanged={index => {
                  setTabIndex(index);
                }}
                showsButtons={false}
                showsPagination={false}
                loop={false}>
                <Pressable
                  pb={5}
                  px={5}
                  width={screenWith}
                  height={mainHeight}
                  justifyContent="center">
                  <RecordCard
                    onDelete={() => {
                      if (savedList[item?._id]?.recordUrl?.word) {
                        console.log('delete');
                      }
                    }}
                    initialRecordUri={savedList[item?._id]?.recordUrl?.word}
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
                </Pressable>
                <Pressable
                  px={5}
                  pb={5}
                  width={screenWith}
                  height={mainHeight}
                  justifyContent="center">
                  <RecordCard
                    initialRecordUri={savedList[item?._id]?.recordUrl?.sentence}
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
                </Pressable>
                <Pressable
                  style={{
                    width: screenWith,
                    height: screenHeight - footerHeight - headerHeight,
                  }}
                  position="absolute">
                  <ScrollView
                    position="absolute"
                    left={0}
                    right={0}
                    style={{
                      width: screenWith,
                      height: screenHeight - footerHeight - headerHeight,
                    }}>
                    <Pressable pb={5}>
                      <VStack mb={4} px={5} py={2} space={5}>
                        <RecordCard
                          initialRecordUri={
                            savedList[item?._id]?.recordUrl?.word
                          }
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

                        <RecordCard
                          initialRecordUri={
                            savedList[item?._id]?.recordUrl?.sentence
                          }
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
                      </VStack>
                    </Pressable>
                  </ScrollView>
                </Pressable>
              </Swiper>
            );
          }}
        />
      </View>

      <HStack
        flexShrink={0}
        py={8}
        bg="white"
        zIndex={1}
        position="absolute"
        left={0}
        bottom={0}
        w="full"
        px={5}
        space={1}>
        {vocabularies.length > 0 && vocabularies.length - 1 !== currentIdx && (
          <Button
            disabled={currentIdx === vocabularies.length - 1}
            onPress={forward}
            variant="ghost">
            Skip
          </Button>
        )}
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

  const disabledBackward = currentIdx === 0;
  const disabledForward = currentIdx === total - 1;

  return (
    <>
      <HStack h={14} alignItems="center" justifyContent="space-between">
        <Pressable p={5} onPress={goBack}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
        <HStack space={8}>
          <Pressable px={3} disabled={disabledBackward} onPress={backward}>
            <ChevronLeft
              opacity={disabledBackward ? 0.3 : 0.6}
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
          <Pressable px={3} disabled={disabledForward} onPress={forward}>
            <ChevronRight
              opacity={disabledForward ? 0.3 : 0.6}
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
  swiperDeckContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: 'absolute',
  },
  swiperDeckCard: {
    top: 0,
    left: 0,
  },
  textStep: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.text,
  },
});
