// @ts-nocheck
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {HStack, Pressable, View} from 'native-base';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import SwiperDeck from 'react-native-deck-swiper';
import {Filter} from '../../../../components/filter';
import ArrowDownIcon from '../../../../components/icons/arrow-down-icon';
import CloseIcon from '../../../../components/icons/close-icon';
import PlayAllIcon from '../../../../components/icons/play-all-icon';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import UserAvatar from '../../../../components/user-avatar';
import AudioItem from '../../components/AudioItem';
const fullHeight = Dimensions.get('window').height;
type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};

import {useDispatch} from 'react-redux';
import {IParamAudio} from '../../../../interfaces/api/Listen';
import {IUser} from '../../../../interfaces/api/User';
import {useRootSelector} from '../../../../redux/reducers';
import {togglePlayAll} from '../../../../redux/reducers/slider.reducer';
import HeaderSwiper from '../../components/HeaderSwiper';

const ListAudioListenScreen = (props: Props) => {
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  console.log(currentUserIndex);
  const swiperRef = useRef<SwiperDeck>(null);
  const [selectedUser, setSelectUser] = useState<IUser>();
  const [currentIdx, setCurrentIdx] = useState(0);
  const dispatch = useDispatch();
  const playAll = useRootSelector(item => item.slider.isPlayAll);
  const navigation = useNavigation();

  const {route} = props;
  const {typeScreen, recordId, groupId, group, vocabularyId, records, user} =
    route.params!;
  const [params, setParams] = useState<IParamAudio>({
    recordId: recordId,
    groupId: groupId,
    vocabularyId: vocabularyId,
  });

  if (!recordId) {
    return null;
  }

  const handleNext = () => {
    swiperRef.current?.swipeLeft();
  };
  const forward = () => {
    if (currentIdx >= displayRecords.length - 1) {
      return;
    }
    swiperRef.current?.swipeLeft();
  };
  const backward = () => {
    if (currentIdx === 0) {
      return;
    }
    swiperRef.current?.swipeRight();
  };
  useEffect(() => {
    if (currentIdx < 0) {
      return;
    }

    setSelectUser(prev => displayRecords[currentIdx].user);
  }, [currentIdx]);

  const displayRecords = useMemo(() => {
    console.log('records');

    if (!records) {
      return [];
    }

    if (!groupId) {
      return records.map(item => {
        return {
          ...item,
          user: user,
        };
      });
    }
    const groupedRecords: any = {};

    for (const record of records) {
      const textEN = record.vocabulary.text.en;

      if (!groupedRecords[textEN]) {
        groupedRecords[textEN] = [];
      }

      groupedRecords[textEN].push(record);
    }

    return Object.values(groupedRecords);
  }, [records, currentUserIndex]);

  const userFilters = useMemo(() => {
    if (!groupId || currentIdx < 0 || !displayRecords) {
      return null;
    }
    const result = displayRecords[currentIdx].map(item => {
      return {
        label: item.user.displayName,
        value: item.user._id,
        icon: (
          <UserAvatar
            imageUrl={item.user.avatar}
            w={6}
            h={6}
            flagWidth={2}
            nativeLanguage={item.user.nativeLanguage}
          />
        ),
      };
    });

    return result;
  }, [displayRecords]);

  return (
    <ScreenWrapper>
      <HStack justifyContent={'space-between'} mb={6}>
        <Pressable
          p={8}
          m={-8}
          onPress={() => {
            navigation.goBack();
          }}>
          <CloseIcon />
        </Pressable>
        {displayRecords && displayRecords.length > 0 && (
          <HeaderSwiper
            currentIdx={currentIdx}
            navigation={navigation}
            total={displayRecords.length || 0}
            forward={forward}
            backward={backward}
          />
        )}

        <Pressable
          p={5}
          m={-5}
          onPress={() => {
            dispatch(togglePlayAll());
          }}>
          <PlayAllIcon isHighLight={playAll} />
        </Pressable>
      </HStack>
      <HStack justifyContent={'center'}>
        {typeScreen === 'group' &&
          displayRecords &&
          displayRecords.length > 0 &&
          currentIdx >= 0 && (
            <Filter
              maxHeight={220}
              marginTop={2}
              marginLeft={-2}
              placement="bottom"
              icon={
                <HStack space={2} alignItems={'center'}>
                  <UserAvatar
                    imageUrl={
                      displayRecords[currentIdx][currentUserIndex].user.avatar
                    }
                    nativeLanguage={
                      displayRecords[currentIdx][currentUserIndex].user
                        .nativeLanguage
                    }
                  />
                  <ArrowDownIcon />
                </HStack>
              }
              onSelected={(data, index) => {
                setCurrentUserIndex(index);
                setParams(prev => {
                  return {
                    ...prev,
                    userId: data.value,
                  };
                });
              }}
              filterItems={userFilters}
            />
          )}
      </HStack>
      <View h={700}>
        {displayRecords && displayRecords.length > 0 && currentIdx >= 0 && (
          <SwiperDeck
            disableLeftSwipe={currentIdx >= displayRecords.length - 1}
            disableRightSwipe={
              currentIdx <= 0 || currentIdx >= displayRecords.length
            }
            onSwipedLeft={cardIndex => {
              setCurrentIdx(prev => ++prev);
            }}
            onSwipedRight={cardIndex => {
              setCurrentIdx(prev => --prev);
            }}
            ref={swiperRef}
            verticalSwipe={false}
            infinite={false}
            swipeAnimationDuration={450}
            containerStyle={{
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              paddingVertical: 0,
              position: 'absolute',
            }}
            cardStyle={{
              top: 0,
              left: 0,
            }}
            cards={displayRecords}
            renderCard={item => {
              return (
                <AudioItem
                  handleNext={handleNext}
                  recordData={groupId ? item[currentUserIndex] : item}
                />
              );
            }}
            backgroundColor="transparent"
            showSecondCard={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ListAudioListenScreen;
