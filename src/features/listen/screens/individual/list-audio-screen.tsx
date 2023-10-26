import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
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
import {listenService} from '../../../../services/listen.service';
import AudioItem from '../../components/AudioItem';
const fullHeight = Dimensions.get('window').height;
type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};

import {useDispatch} from 'react-redux';
import {togglePlayAll} from '../../../../redux/reducers/slider.reducer';
import {useRootSelector} from '../../../../redux/reducers';
import HeaderSwiper from '../../components/HeaderSwiper';
import {IUser} from '../../../../interfaces/api/User';
import {IParamAudio} from '../../../../interfaces/api/Listen';
import {panGestureHandlerCustomNativeProps} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

const ListAudioListenScreen = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperDeck>(null);
  const [selectedUser, setSelectUser] = useState<IUser>();
  const [currentIdx, setCurrentIdx] = useState(0);
  const dispatch = useDispatch();
  const playAll = useRootSelector(item => item.slider.isPlayAll);
  const navigation = useNavigation();

  const {route} = props;
  const {typeScreen, recordId, groupId, group, vocabularyId} = route.params!;
  const [params, setParams] = useState<IParamAudio>({
    recordId: recordId,
    groupId: groupId,
    vocabularyId: vocabularyId,
  });

  if (!recordId) {
    return null;
  }
  const keyCaches = ['getAudioDetail', params];

  const {data: audioList, isSuccess} = useQuery(keyCaches, () =>
    listenService.getAudioList(params),
  );

  const {data: members} = useQuery(
    ['getUserAudioInGroup', params.vocabularyId],
    () => listenService.getUserAudioInGroup(params),
    {
      enabled: !!params.groupId,
    },
  );
  const dataRecord = useMemo(() => {
    let mergeArray = [];
    if (!audioList) {
      return;
    }
    const {currentRecord, nextRecord} = audioList!;
    if (!currentRecord) {
      return [];
    }
    if (currentRecord) {
      mergeArray.push(currentRecord);
    }

    if (nextRecord && nextRecord.length > 0) {
      mergeArray = [...mergeArray, ...nextRecord];
    }
    return mergeArray;
  }, [audioList]);

  const groupMember = useMemo(() => {
    console.log({members});
    if (!members) {
      return [];
    }
    return members.map(item => ({
      label: item.displayName,
      value: item._id,
      icon: (
        <UserAvatar
          imageUrl={item.avatar}
          w={6}
          h={6}
          flagWidth={2}
          nativeLanguage={item.nativeLanguage}
        />
      ),
    }));
  }, [members]);

  const handleNext = () => {
    swiperRef.current?.swipeLeft();
  };
  const forward = () => {
    swiperRef.current?.swipeLeft();
  };
  const backward = () => {
    if (currentIdx === 0) {
      return;
    }
    swiperRef.current?.swipeRight();
  };
  useEffect(() => {
    if (currentIdx < 0 || !dataRecord || dataRecord.length == 0) {
      return;
    }
    setParams(prev => {
      return {
        ...prev,
        vocabularyId: dataRecord[currentIdx].vocabulary._id,
      };
    });
    setSelectUser(prev => dataRecord[currentIdx].user);
  }, [currentIdx, dataRecord?.length]);
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
        {dataRecord && dataRecord?.length > 0 && (
          <HeaderSwiper
            currentIdx={currentIdx}
            navigation={navigation}
            total={dataRecord?.length || 0}
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
        {typeScreen === 'group' && selectedUser && (
          <Filter
            maxHeight={220}
            marginTop={2}
            marginLeft={-2}
            placement="bottom"
            icon={
              <HStack space={2} alignItems={'center'}>
                <UserAvatar
                  imageUrl={selectedUser.avatar}
                  nativeLanguage={selectedUser.nativeLanguage}
                />
                <ArrowDownIcon />
              </HStack>
            }
            onSelected={data => {
              if (!members) {
                return;
              }
              setParams(prev => {
                return {
                  ...prev,
                  userId: data.value,
                };
              });
              const user = group.members.find(
                (item: any) => item._id === data.value,
              );

              setSelectUser(user);
            }}
            filterItems={groupMember}
          />
        )}
      </HStack>
      <View h={700}>
        {dataRecord && dataRecord.length > 0 && (
          <SwiperDeck
            onSwipedLeft={cardIndex => {
              if (cardIndex <= 1) {
                return;
              }
              setCurrentIdx(prev => ++prev);
            }}
            onSwipedRight={cardIndex => {
              if (cardIndex === dataRecord.length - 1) {
                return;
              }
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
            cards={dataRecord}
            renderCard={item => (
              <AudioItem handleNext={handleNext} record={item} />
            )}
            backgroundColor="transparent"
            showSecondCard={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ListAudioListenScreen;
