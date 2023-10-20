import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {HStack, Pressable, View} from 'native-base';
import {useMemo, useRef, useState} from 'react';
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

const ListAudioListenScreen = (props: Props) => {
  const swiperRef = useRef<SwiperDeck>(null);
  const dispatch = useDispatch();
  const playAll = useRootSelector(item => item.slider.isPlayAll);
  const navigation = useNavigation();

  const filterItems = [
    {
      label: 'Test',
      value: 'test',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test1',
      value: 'test1',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test2',
      value: 'test2',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test3',
      value: 'test3',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test4',
      value: 'test4',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
  ];
  const {route} = props;
  const {typeScreen, recordId} = route.params!;

  if (!recordId) {
    return null;
  }
  const {data: audioList} = useQuery(['getAudioDetail', recordId], () =>
    listenService.getAudioList(recordId),
  );
  const dataRecord = useMemo(() => {
    let mergeArray = [];
    if (!audioList) {
      return;
    }
    const {currentRecord, nextRecord} = audioList!;
    if (currentRecord) {
      mergeArray.push(currentRecord);
    }
    if (nextRecord && nextRecord.length > 0) {
      mergeArray = [...mergeArray, ...nextRecord];
    }
    return mergeArray;
  }, [audioList]);

  const handleNext = () => {
    swiperRef.current?.swipeLeft();
  };
  return (
    <ScreenWrapper>
      <HStack justifyContent={'space-between'} mb={6}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <CloseIcon />
        </Pressable>

        {typeScreen === 'group' && (
          <Filter
            maxHeight={220}
            marginTop={2}
            marginLeft={-2}
            placement="bottom"
            icon={
              <HStack space={2} alignItems={'center'}>
                <UserAvatar nativeLanguage={'ko'} />
                <ArrowDownIcon />
              </HStack>
            }
            onSelected={value => {
              console.log(value);
            }}
            filterItems={filterItems}
          />
        )}
        <Pressable
          onPress={() => {
            dispatch(togglePlayAll());
          }}>
          <PlayAllIcon isHighLight={playAll} />
        </Pressable>
      </HStack>

      <View h={700}>
        {dataRecord && dataRecord.length > 0 && (
          <SwiperDeck
            ref={swiperRef}
            horizontalSwipe={false}
            verticalSwipe={false}
            infinite={true}
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
          // <Swiper
          //   index={currentPlayingIndex}
          //   ref={swiperRef}
          //   loadMinimalLoader={<Text>sss</Text>}
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={isFetching}
          //       colors={[COLORS.highlight]}
          //     />
          //   }
          //   showsButtons={false}
          //   loop={false}
          //   showsPagination={false}>
          //   {dataRecord.map(item => {
          //     return (
          //       <AudioItem
          //         handleNext={handleNext}
          //         key={item._id}
          //         record={item}
          //       />
          //     );
          //   })}
          // </Swiper>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ListAudioListenScreen;
