import {NavigationProp, RouteProp} from '@react-navigation/native';
import {HStack, View} from 'native-base';
import {Dimensions} from 'react-native';
import {Filter} from '../../../../components/filter';
import ArrowDownIcon from '../../../../components/icons/arrow-down-icon';
import CloseIcon from '../../../../components/icons/close-icon';
import PlayAllIcon from '../../../../components/icons/play-all-icon';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import UserAvatar from '../../../../components/user-avatar';
import AudioItem from '../../components/AudioItem';
import CustomSwiper from '../../components/CustomSwiper';
import {useQuery} from '@tanstack/react-query';
import {listenService} from '../../../../services/listen.service';
const fullHeight = Dimensions.get('window').height;
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useMemo, useState} from 'react';
type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const ListAudioListenScreen = (props: Props) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number>(-1);
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
    return mergeArray.slice(0, 9);
  }, [audioList]);
  const playAudio = (index: number) => {
    setCurrentPlayingIndex(index);
  };
  return (
    <ScreenWrapper>
      <HStack justifyContent={'space-between'} mb={6}>
        <CloseIcon />
        {typeScreen === 'group' && (
          <Filter
            maxHeight={220}
            marginTop={2}
            marginLeft={-2}
            placement="bottom"
            icon={
              <HStack space={2} alignItems={'center'}>
                <UserAvatar nation={'ko'} />
                <ArrowDownIcon />
              </HStack>
            }
            onSelected={value => {
              console.log(value);
            }}
            filterItems={filterItems}
          />
        )}
        <PlayAllIcon />
      </HStack>

      <View h={700}>
        {dataRecord && dataRecord.length > 0 && (
          <SwiperFlatList
            maxToRenderPerBatch={1}
            initialNumToRender={1}
            data={dataRecord}
            renderItem={({item, index}) => (
              <AudioItem key={index} record={item} />
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ListAudioListenScreen;
