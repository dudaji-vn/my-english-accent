import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import MainLayout from '../../../components/layout/main-layout';
import {Topic, TopicCard} from '../../../components/topic-card';
import {HStack, Text, VStack} from 'native-base';
import {WordItem} from '../../../components/word-item';
import {MicCheckIcon, MicFilledIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {Filter} from '../../../components/filter';
import {AppProgress} from '../../../components/app-progress';
import {Headphones} from 'react-native-feather';

const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

type Props = {
  navigation: NavigationProp<any>;
};

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
    text: 'Hi',
    isRecorded: true,
  },
];

const ExampleComponentsScreen = ({}: Props) => {
  return (
    <MainLayout>
      <VStack space={10}>
        <Section title="Topic Card">
          <HStack space={4} justifyContent="space-between">
            {data.map((topic, index) => (
              <TopicCard isActive={index === 0} key={index} topic={topic} />
            ))}
          </HStack>
        </Section>
        <Section title="Word Item">
          <VStack space={4} justifyContent="space-between">
            {words.map((topic, index) => (
              <WordItem
                key={index}
                word={topic.text}
                status={topic.isRecorded ? 'disabled' : 'active'}
                leftElement={
                  topic.isRecorded ? (
                    <MicCheckIcon />
                  ) : (
                    <MicFilledIcon opacity={0.1} color={COLORS.text} />
                  )
                }
              />
            ))}
          </VStack>
        </Section>
        <Section title="Filter">
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
        </Section>
        <Section title="App Progress">
          <AppProgress
            progress={40}
            startIcon={<Headphones color="white" width={20} height={20} />}
          />
        </Section>
      </VStack>
    </MainLayout>
  );
};

const Section = ({title, children}: {title: string; children: any}) => {
  return (
    <VStack space={2}>
      <Text bold color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};

export default ExampleComponentsScreen;
