import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {FlatList, HStack, Spinner, VStack, View, useToast} from 'native-base';
import React from 'react';
import {RefreshControl} from 'react-native';
import {Mic} from 'react-native-feather';
import {AppProgress} from '../../../components/app-progress';
import {Filter} from '../../../components/filter';
import {MicCheckIcon, SmallMicFilledIcon} from '../../../components/icons';
import {Toast} from '../../../components/toast';
import {Topic, TopicCard} from '../../../components/topic-card';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useRootSelector} from '../../../redux/reducers';
import {recordService} from '../../../services/record.service';
import {GetVocabulariesParams, Vocabulary} from '../../../types/vocabulary';
import {useGetVocabularies} from '../hooks/use-get-vocabularies';
import {useIsFocused} from '@react-navigation/native';
const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

const developerImg = require('../../../assets/images/Dev.png');

const filterItems = [
  {
    label: 'Incomplete',
    value: 'recordStatus=not-recorded',
  },
  {
    label: 'Completed recently',
    value: 'recordStatus=recorded',
  },
  {
    label: 'Type (verb)',
    value: 'type=Verb',
  },
  {
    label: 'Type (noun)',
    value: 'type=Noun',
  },
  {
    label: 'Type (place / time)',
    value: 'type=Place / Time',
  },
];

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
  jumpTo: (key: string) => void;
};
const topics: Topic[] = [
  {
    _id: 'general',
    name: 'General',
    image: generalImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
  {
    _id: 'developer',
    name: 'Developer',
    image: developerImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
  {
    _id: 'designer',
    name: 'Designer',
    image: designerImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
];

const Record = ({navigation, route, jumpTo}: Props) => {
  const role = useRootSelector(state => state.user.profile?.role);
  const hasNewRecord = route.params?.hasNewRecord;
  const savedNumber = route.params?.savedNumber;
  const isFocused = useIsFocused();
  const toast = useToast();
  const [filter, setFilter] = React.useState<GetVocabulariesParams>({
    category: topics[0]._id,
    recordStatus: 'all',
    pageSize: 0,
  });
  const {data, refetch, queryKey, isRefetching, isLoading} =
    useGetVocabularies(filter);
  const {data: progress, refetch: refetchProgress} = useQuery({
    queryKey: ['progress'],
    queryFn: recordService.getRecordProgress,
  });

  const vocabularies = data?.items || [];

  const handlePressItem = (vocabulary: Vocabulary) => {
    navigation.navigate(SCREEN_NAMES.recordNavigator, {
      screen: SCREEN_NAMES.wordsRecord,
      params: {
        vocabularyId: vocabulary._id,
        category: vocabulary.category,
        filter,
        refreshKey: queryKey,
        firstVocabulary: vocabulary,
      },
    });
  };
  const handleSelectedFilter = (value: string) => {
    const key = value.split('=')[0];
    const val = value.split('=')[1];
    setFilter(prev => ({...prev, [key]: val}));
  };

  const topicsShow = React.useMemo(() => {
    const result = [topics[0]];
    switch (role) {
      case 'designer':
        result.push(topics[2]);
        break;
      case 'developer':
        result.push(topics[1]);
        break;
      default:
        break;
    }
    return result.map(topic => ({
      ...topic,
      totalWords:
        progress?.vocabularyCountByCategory.find(item => item._id === topic._id)
          ?.count || 0,
      numOfAchieved:
        progress?.recordProgress.find(item => item._id === topic._id)?.count ||
        0,
    }));
  }, [progress, role]);

  const progressValue = React.useMemo(() => {
    const total = topicsShow.reduce((prev, curr) => {
      return prev + curr.totalWords;
    }, 0);
    const achieved = topicsShow.reduce((prev, curr) => {
      return prev + curr.numOfAchieved;
    }, 0);
    return Math.round((achieved / total) * 100);
  }, [topicsShow]);

  const renderSeparator = () => <View h={5} />;

  React.useEffect(() => {
    if (hasNewRecord && savedNumber > 0) {
      const unit = savedNumber > 1 ? 'records' : 'record';
      toast.show({
        render(props) {
          return (
            <Toast
              leftElementOnPress={() => {
                jumpTo('My record list');
              }}
              leftElement={<>Show me</>}
              {...props}
              status="success">
              You have {savedNumber} new {unit}!
            </Toast>
          );
        },
      });
      navigation.setParams({hasNewRecord: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNewRecord, savedNumber]);

  return (
    <VStack flex={1} pt={5} px={5}>
      <AppProgress
        progress={progressValue || 0}
        startIcon={<Mic color="white" width={20} height={20} />}
      />
      <HStack space={4} mt={8}>
        {topicsShow.map((topic, index) => (
          <TopicCard
            onPress={() => handleSelectedFilter(`category=${topic._id}`)}
            isActive={filter.category === topic._id}
            key={index}
            topic={topic}
          />
        ))}
      </HStack>
      <View mt={5}>
        <Filter
          onSelected={value => handleSelectedFilter(value.value)}
          filterItems={filterItems}
        />
      </View>
      {isFocused && (
        <>
          {isLoading ? (
            <Spinner mt={12} size="lg" color={COLORS.highlight} />
          ) : (
            <FlatList
              getItemLayout={(data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={() => {
                    refetch();
                    refetchProgress();
                  }}
                  colors={[COLORS.highlight]}
                />
              }
              mt={5}
              ItemSeparatorComponent={renderSeparator}
              data={vocabularies}
              numColumns={1}
              renderItem={({item, index}) => {
                const isRecorded = item.isRecorded;
                return (
                  <>
                    <WordItem
                      onPress={
                        isRecorded ? undefined : () => handlePressItem(item)
                      }
                      key={index}
                      word={item.text.en}
                      status={isRecorded ? 'disabled' : 'active'}
                      rightElement={
                        isRecorded ? <MicCheckIcon /> : <SmallMicFilledIcon />
                      }
                    />
                    {index === vocabularies.length - 1 && <View h={31} />}
                  </>
                );
              }}
              keyExtractor={item => item._id}
            />
          )}
        </>
      )}
    </VStack>
  );
};

export default Record;
