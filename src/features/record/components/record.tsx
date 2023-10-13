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
const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

type Props = {};
const data: Topic[] = [
  {
    name: 'General',
    image: generalImg,
    description: 'General description',
    totalWords: 100,
    numOfAchieved: 10,
  },
  {
    name: 'Developer',
    image: designerImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
];
const words: {
  text: string;
  isRecorded: boolean;
}[] = [
  {
    text: 'Hello',
    isRecorded: false,
  },
  {
    text: 'Hi1',
    isRecorded: true,
  },
  {
    text: 'Hi2',
    isRecorded: true,
  },
  {
    text: 'Hi3',
    isRecorded: true,
  },
  {
    text: 'Hi4',
    isRecorded: true,
  },
  {
    text: 'Hi5',
    isRecorded: true,
  },
  {
    text: 'Hi6',
    isRecorded: true,
  },
  {
    text: 'Hi7',
    isRecorded: true,
  },
  {
    text: 'Hi8',
    isRecorded: true,
  },
  {
    text: 'Hi9',
    isRecorded: true,
  },
  {
    text: 'Hi10',
    isRecorded: true,
  },
  {
    text: 'Hi11',
    isRecorded: true,
  },
  {
    text: 'Hi12',
    isRecorded: true,
  },
];
const Record = (props: Props) => {
  const navigation = useNavigation();
  return (
    <VStack flex={1} pt={5}>
      <AppProgress
        progress={40}
        startIcon={<Mic color="white" width={20} height={20} />}
      />
      <HStack space={4} mt={8} justifyContent="space-between">
        {data.map((topic, index) => (
          <TopicCard isActive={index === 0} key={index} topic={topic} />
        ))}
      </HStack>
      <View mt={5}>
        <Filter
          onSelected={value => console.log(value)}
          filterItems={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Recorded',
              value: 'recorded',
            },
            {
              label: 'Not recorded',
              value: 'not-recorded',
            },
          ]}
        />
      </View>
      <FlatList
        mt={5}
        ItemSeparatorComponent={() => <View h={5} />}
        data={words}
        numColumns={1}
        renderItem={({item, index}) => (
          <>
            <WordItem
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.recordNavigator, {
                  screen: SCREEN_NAMES.wordsRecord,
                });
              }}
              key={index}
              word={item.text}
              status={item.isRecorded ? 'disabled' : 'active'}
              leftElement={
                item.isRecorded ? (
                  <MicCheckIcon />
                ) : (
                  <MicFilledIcon opacity={0.1} color={COLORS.text} />
                )
              }
            />
            {index === words.length - 1 && <View h={31} />}
          </>
        )}
        keyExtractor={item => item.text}
      />
    </VStack>
  );
};

export default Record;
