import {FlatList, HStack, VStack, View} from 'native-base';
import React from 'react';
import {Mic} from 'react-native-feather';
import {AppProgress} from '../../../components/app-progress';
import {Filter} from '../../../components/filter';
import {MicCheckIcon, MicFilledIcon} from '../../../components/icons';
import {Topic, TopicCard} from '../../../components/topic-card';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useQuery} from '@tanstack/react-query';
import {
  GetVocabulariesParams,
  vocabularyService,
} from '../../../services/vocabulary.service';
import {recordService} from '../../../services/record.service';
import {useRootSelector} from '../../../redux/reducers';
import {Vocabulary} from '../../../types/vocabulary';
const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

const developerImg = require('../../../assets/images/Dev.png');

const recordedIds = ['6528c17b0187283073293cac'];

const filterItems = [
  {
    label: 'Incomplete',
    value: 'isRecorded=false',
  },
  {
    label: 'Completed recently',
    value: 'isRecorded=true',
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

type Props = {};
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

const Record = ({}: Props) => {
  const role = useRootSelector(state => state.user.profile?.role);
  const navigation = useNavigation();
  const [filter, setFilter] = React.useState<GetVocabulariesParams>({
    category: topics[0]._id,
  });
  const {data} = useQuery({
    queryKey: ['vocabulary', filter],
    queryFn: () => vocabularyService.getVocabularies(filter),
  });
  const {data: progress} = useQuery({
    queryKey: ['progress'],
    queryFn: recordService.getRecordProgress,
  });

  const vocabularies = data?.items || [];

  const handlePressItem = (vocabulary: Vocabulary) => {
    navigation.navigate(SCREEN_NAMES.recordNavigator, {
      screen: SCREEN_NAMES.wordsRecord,
      params: {
        vocabularyId: vocabulary._id,
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

  return (
    <VStack flex={1} pt={5}>
      <AppProgress
        progress={progressValue}
        startIcon={<Mic color="white" width={20} height={20} />}
      />
      <HStack space={4} mt={8} justifyContent="space-between">
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
      <FlatList
        mt={5}
        ItemSeparatorComponent={() => <View h={5} />}
        data={vocabularies}
        numColumns={1}
        renderItem={({item, index}) => {
          const isRecorded = recordedIds.includes(item._id);
          return (
            <>
              <WordItem
                onPress={isRecorded ? undefined : () => handlePressItem(item)}
                key={index}
                word={item.text.en}
                status={isRecorded ? 'disabled' : 'active'}
                leftElement={
                  isRecorded ? (
                    <MicCheckIcon />
                  ) : (
                    <MicFilledIcon opacity={0.1} color={COLORS.text} />
                  )
                }
              />
              {index === vocabularies.length - 1 && <View h={31} />}
            </>
          );
        }}
        keyExtractor={item => item._id}
      />
    </VStack>
  );
};

export default Record;
