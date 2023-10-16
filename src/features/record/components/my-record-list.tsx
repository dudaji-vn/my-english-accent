import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  FlatList,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import {Send} from 'react-native-feather';
import {Filter} from '../../../components/filter';
import {Input} from '../../../components/form';
import {Topic, TopicCard} from '../../../components/topic-card';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useRootSelector} from '../../../redux/reducers';
import {GetRecordsParams} from '../../../types/record';
import {Vocabulary} from '../../../types/vocabulary';
import {useGetMyRecords} from '../hooks/use-get-my-records';
import {useQuery} from '@tanstack/react-query';
import {recordService} from '../../../services/record.service';
const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

const developerImg = require('../../../assets/images/Dev.png');

const filterItems = [
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

const MyRecordList = ({}: Props) => {
  const role = useRootSelector(state => state.user.profile?.role);
  const navigation = useNavigation();
  const [filter, setFilter] = React.useState<GetRecordsParams>({
    category: topics[0]._id,
    pageSize: 0,
  });
  const {data, refetch, isFetching} = useGetMyRecords(filter);

  const vocabularies = data?.items || [];
  const {data: progress} = useQuery({
    queryKey: ['progress'],
    queryFn: recordService.getRecordProgress,
  });
  console.log('progress', progress);

  const handlePressItem = (vocabulary: Vocabulary) => {
    navigation.navigate(SCREEN_NAMES.recordNavigator, {
      screen: SCREEN_NAMES.wordsRecord,
      params: {
        vocabularyId: vocabulary._id,
        category: vocabulary.category,
        filter,
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
        progress?.recordProgress.find(item => item._id === topic._id)?.count ||
        0,
    }));
  }, [progress?.recordProgress, role]);

  const renderSeparator = () => <View h={5} />;

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <VStack flex={1} pt={5}>
      <Input typeInput="search" />
      <HStack space={4} mt={5} justifyContent="space-between">
        {topicsShow.map((topic, index) => (
          <TopicCard
            hideProgress
            onPress={() => handleSelectedFilter(`category=${topic._id}`)}
            isActive={filter.category === topic._id}
            key={index}
            topic={topic}
          />
        ))}
      </HStack>
      <HStack justifyContent="space-between" mt={5}>
        <Filter
          onSelected={value => handleSelectedFilter(value.value)}
          filterItems={filterItems}
        />
        <SendAllButton />
      </HStack>
      {isFetching ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner size="lg" color={COLORS.highlight} />
        </View>
      ) : (
        <FlatList
          mt={5}
          ItemSeparatorComponent={renderSeparator}
          data={vocabularies}
          numColumns={1}
          renderItem={({item, index}) => {
            return (
              <>
                <WordItem
                  onPress={() => handlePressItem(item.vocabulary)}
                  key={index}
                  word={item.vocabulary.text.en}
                  status="default"
                  leftElement={
                    <Send
                      opacity={0.6}
                      width={24}
                      height={24}
                      color={COLORS.text}
                    />
                  }
                />
                {index === vocabularies.length - 1 && <View h={31} />}
              </>
            );
          }}
          keyExtractor={item => item._id}
        />
      )}
    </VStack>
  );
};

export default MyRecordList;

const SendAllButton = () => {
  const [color, setColor] = React.useState(COLORS.text);
  const [opacity, setOpacity] = React.useState(0.6);
  return (
    <Pressable
      opacity={opacity}
      onPressIn={() => {
        setColor(COLORS.highlight);
        setOpacity(1);
      }}
      onPressOut={() => {
        setColor(COLORS.text);
        setOpacity(0.6);
      }}>
      <HStack>
        <Send width={24} height={24} color={color} />
        <Text ml={2} fontWeight="semibold" color={color}>
          Send all files
        </Text>
      </HStack>
    </Pressable>
  );
};
