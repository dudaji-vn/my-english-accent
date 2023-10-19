import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {HStack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {FlatList, RefreshControl, View} from 'react-native';
import {Headphones} from 'react-native-feather';
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
import {SCREEN_NAMES} from '../../../../constants/screen';
import {IParamListenDetail} from '../../../../interfaces/api/Listen';
import {IUserProgress} from '../../../../interfaces/api/User';
import {listenService} from '../../../../services/listen.service';
import RowGroup from '../../components/RowGroup';
import RowUserAvatar from '../../components/RowUserAvatar';
import {COLORS} from '../../../../constants/design-system';

type RootStackParamList = {
  ListenDetail: {user?: IUserProgress; typeScreen: string};
};
type Props = {
  route: RouteProp<RootStackParamList, 'ListenDetail'>;
  navigation: NavigationProp<any>;
};

const filterItems = [
  {
    label: 'Latest files first',
    value: 'Latest files first',
  },
  {
    label: 'Oldest files first',
    value: 'Oldest files first',
  },
  {
    label: 'Completed recently',
    value: 'Completed recently',
  },
  {
    label: 'Type (Verb)',
    value: 'Type (Verb)',
  },
  {
    label: 'Type (Noun)',
    value: 'Type (Noun)',
  },
  {
    label: 'Type (Place / Time)',
    value: 'Type (Place / Time)',
  },
];
const ListenDetailScreen = ({route}: Props) => {
  const {typeScreen, user} = route.params!;
  const [topicShow, setTopicShow] = useState<Topic[]>([]);

  const navigation = useNavigation<any>();
  const [indexTopicActive, setIndexTopicActive] = useState(0);
  const [params, setParams] = useState<IParamListenDetail>({
    userId: user?._id,
    category: 'general',
  });

  const {data: listenDetail, isFetching} = useQuery(
    ['listenDetail', user?._id],
    () => listenService.getListenDetail(params),
  );
  useEffect(() => {
    if (listenDetail) {
      const topics = listenDetail
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
  }, [listenDetail?.length]);
  const records = useMemo(() => {
    if (!listenDetail) {
      return [];
    }
    if (!params.category) {
      return;
    }
    return listenDetail.find(
      item => item.category.toUpperCase() === params?.category?.toUpperCase(),
    )?.records;
  }, [params.category, listenDetail?.length]);

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
          {typeScreen === 'group' ? (
            <RowGroup />
          ) : (
            user && <RowUserAvatar user={user} />
          )}
          <InfoIcon />
        </HStack>
        <DownLoadIcon />
      </HStack>
      {user && (
        <AppProgress
          progress={Math.round((user?.totalListen * 100) / user?.totalRecord)}
          startIcon={<Headphones color="white" width={20} height={20} />}
        />
      )}

      <HStack my={6} space={4} justifyContent="space-between">
        {topicShow &&
          topicShow.map((topic, index) => (
            <TopicCard
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
          onSelected={value => {
            console.log(value);
          }}
        />
        <PlayAllIcon />
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
                  navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
                    screen: SCREEN_NAMES.listAudioListenScreen,
                    params: {typeScreen: 'user', recordId: item._id},
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
