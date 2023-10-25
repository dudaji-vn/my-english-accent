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
    label: 'Completed recently',
    value: 'Completed recently',
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

  const navigation = useNavigation<any>();
  const [indexTopicActive, setIndexTopicActive] = useState(0);
  const [params, setParams] = useState<IParamListenDetail>({
    userId: user?._id,
    category: 'general',
    groupId: groupId,
  });
  const currentProgress = useMemo(() => {
    if (!user) {
      return;
    }
    return Math.round((user?.totalListen * 100) / user?.totalRecord);
  }, [user]);
  const {
    data: listenDetail,
    isFetching,
    refetch,
  } = useQuery(['listenDetail', params], () =>
    listenService.getListenDetail(params),
  );
  console.log(listenDetail);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (refetch) {
        console.log('refetch');
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
    console.log('calling');
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
        mt={5}
        mb={6}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <HStack space={2} alignItems={'center'}>
          {typeScreen === 'group'
            ? listenDetail &&
              listenDetail?.group && <RowGroup group={listenDetail.group} />
            : user && <RowUserAvatar user={user} />}

          {!isFetching && <InfoIcon />}
        </HStack>
        <DownLoadIcon />
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
          <RefreshControl refreshing={isFetching} colors={[COLORS.highlight]} />
        }
        numColumns={1}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        horizontal={false}
        data={records}
        renderItem={({item}) =>
          item &&
          item.vocabulary && (
            <View style={{marginBottom: 10}}>
              <WordItem
                onPress={() => {
                  dispatch(turnOffPlayAll());
                  navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
                    screen: SCREEN_NAMES.listAudioListenScreen,
                    params: {
                      typeScreen: !!params.groupId ? 'group' : 'user',
                      recordId: item._id,
                      groupId: params.groupId,
                      group: listenDetail?.group,
                    },
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
    </ScreenWrapper>
  );
};

export default ListenDetailScreen;
