import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {HStack, Pressable} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {FlatList, RefreshControl, View} from 'react-native';
import {Headphones} from 'react-native-feather';
import {useDispatch} from 'react-redux';
import {AppProgress} from '../../../../components/app-progress';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';
import {Filter} from '../../../../components/filter';
import DownLoadIcon from '../../../../components/icons/download-icon';
import FillIcon from '../../../../components/icons/fill-icon';
import InfoIcon from '../../../../components/icons/info-icon';
import PlayAllIcon from '../../../../components/icons/play-all-icon';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {Topic, TopicCard} from '../../../../components/topic-card';
import {WordItem} from '../../../../components/word-item';
import {initTopics} from '../../../../configs';
import {COLORS} from '../../../../constants/design-system';
import {SCREEN_NAMES} from '../../../../constants/screen';
import {IParamListenDetail} from '../../../../interfaces/api/Listen';
import {IUserProgress} from '../../../../interfaces/api/User';
import {
  togglePlayAll,
  turnOffPlayAll,
} from '../../../../redux/reducers/slider.reducer';
import {listenService} from '../../../../services/listen.service';
import RowGroup from '../../components/RowGroup';
import RowUserAvatar from '../../components/RowUserAvatar';
import {Modal} from '../../../../components/modal';
import UserModal from '../../../../components/user-modal';
import {useModal} from '../../../../hooks/use-modal';

type RootStackParamList = {
  ListenDetail: {user?: IUserProgress; typeScreen: string; groupId?: string};
};
type Props = {
  route: RouteProp<RootStackParamList, 'ListenDetail'>;
  navigation: NavigationProp<any>;
};

const filterItems = [
  {
    label: 'Latest files first',
    value: 'sortBy=latestFile',
  },
  {
    label: 'Type (Verb)',
    value: 'type=Verb',
  },
  {
    label: 'Type (Noun)',
    value: 'type=Noun',
  },
  {
    label: 'Type (Place / Time)',
    value: 'type=Place / Time',
  },
];
const ListenDetailScreen = ({route}: Props) => {
  const {typeScreen, user, groupId} = route.params!;
  const [topicShow, setTopicShow] = useState<Topic[]>([]);
  const dispatch = useDispatch();
  const {close, open, isShowing} = useModal();
  const navigation = useNavigation<any>();
  const [indexTopicActive, setIndexTopicActive] = useState(0);
  const [params, setParams] = useState<IParamListenDetail>({
    userId: user?._id,
    category: 'general',
    groupId: groupId,
  });

  const {
    data: listenDetail,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery(['listenDetail', params], () =>
    listenService.getListenDetail(params),
  );
  const currentProgress = useMemo(() => {
    if (!listenDetail) {
      return;
    }
    let totalRecord = 1;
    let totalListen = 0;
    for (let i of listenDetail?.recordInfo) {
      totalRecord += i.totalRecord;
      for (let j of i.records) {
        if (j.isListen) {
          totalListen += 1;
        }
      }
    }

    return Math.round((totalListen * 100) / totalRecord);
  }, [listenDetail]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (refetch) {
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (listenDetail && listenDetail.recordInfo) {
      const topics = listenDetail.recordInfo
        .map(item => {
          const topic = initTopics[item.category];
          (topic.totalWords = item.totalRecord),
            (topic.numOfAchieved = item.records.filter(
              item => item.isListen,
            ).length);
          return topic;
        })
        .sort((a, b) => parseInt(a._id) - parseInt(b._id));
      setTopicShow(topics);
    }
  }, [listenDetail]);
  const records = useMemo(() => {
    if (!listenDetail) {
      return [];
    }
    if (!params.category) {
      return;
    }
    return listenDetail.recordInfo.find(
      item => item.category.toUpperCase() === params?.category?.toUpperCase(),
    )?.records;
  }, [params, listenDetail]);

  return (
    <ScreenWrapper>
      <BreadCrumb
        parentTitle="Listen"
        mainTitle={typeScreen === 'user' ? 'Individual' : 'Group'}
      />
      <HStack
        mt={1}
        mb={6}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <HStack space={2} alignItems={'center'}>
          {typeScreen === 'group'
            ? listenDetail &&
              listenDetail?.group && (
                <RowGroup isShowingName group={listenDetail.group} />
              )
            : user && <RowUserAvatar user={user} />}

          {isSuccess && (
            <Pressable
              p={16}
              m={-16}
              onPress={() => {
                if (listenDetail.group) {
                  navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
                    screen: SCREEN_NAMES.detailGroup,
                    params: {typeScreen: 'group', group: listenDetail.group},
                  });
                } else {
                  open();
                }
              }}>
              <InfoIcon />
            </Pressable>
          )}
        </HStack>
        {/* <DownLoadIcon /> */}
      </HStack>
      {user && (
        <AppProgress
          progress={currentProgress}
          startIcon={<Headphones color="white" width={20} height={20} />}
        />
      )}
      <HStack my={6} space={4} justifyContent="space-between">
        {topicShow &&
          topicShow.map((topic, index) => (
            <TopicCard
              minimalOnInActive={index !== indexTopicActive && !!params.groupId}
              onPress={() => {
                setParams({...params, category: topic.name});
                setIndexTopicActive(index);
              }}
              isActive={index === indexTopicActive}
              key={topic._id}
              topic={topic}
            />
          ))}
      </HStack>
      <HStack justifyContent={'space-between'} mb={5}>
        <Filter
          filterItems={filterItems}
          onSelected={item => {
            const query = item.value.split('=');
            const [key, value] = query;
            const newParams = {
              userId: params.userId,
              category: params.category,
              groupId: params.groupId,
              [key]: value,
            };
            setParams(newParams);
          }}
        />

        <Pressable
          p={4}
          m={-4}
          onPress={() => {
            if (!records) return;
            dispatch(togglePlayAll());
            navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
              screen: SCREEN_NAMES.listAudioListenScreen,
              params: {
                typeScreen: 'user',
                recordId: records[0]?._id,
              },
            });
          }}>
          <PlayAllIcon />
        </Pressable>
      </HStack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={!isSuccess} colors={[COLORS.highlight]} />
        }
        numColumns={1}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        horizontal={false}
        data={records}
        renderItem={({item, index}) =>
          item &&
          item.vocabulary && (
            <View style={{marginBottom: 10}}>
              <WordItem
                onPress={() => {
                  dispatch(turnOffPlayAll());
                  let x = {};
                  if (params?.groupId) {
                    x = {
                      typeScreen: !!params.groupId ? 'group' : 'user',
                      recordId: item._id,
                      records: records?.filter((item, id) => id >= index),
                      groupId: params.groupId,
                      group: listenDetail?.group,
                    };
                  } else {
                    x = {
                      typeScreen: 'user',
                      recordId: item._id,
                      records: records?.filter((item, id) => id >= index),
                      user: user,
                    };
                  }
                  navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
                    screen: SCREEN_NAMES.listAudioListenScreen,
                    params: x,
                  });
                }}
                word={item.vocabulary.text.en}
                status={item.isListen ? 'disabled' : 'active'}
                rightElement={<FillIcon isFill={item.isListen} />}
              />
            </View>
          )
        }
        keyExtractor={item => item._id.toString()}
      />

      <Modal isOpen={isShowing} onClose={close}>
        {user && <UserModal user={user} />}
      </Modal>
    </ScreenWrapper>
  );
};

export default ListenDetailScreen;
