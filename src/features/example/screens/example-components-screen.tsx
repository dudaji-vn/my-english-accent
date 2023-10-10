import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import MainLayout from '../../../components/layout/main-layout';
import {Topic, TopicCard} from '../../../components/topic-card';
import {HStack, Text, VStack} from 'native-base';
import {WordItem} from '../../../components/word-item';
import {MicFilledIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';
import {Filter} from '../../../components/filter';

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
      <VStack space={4}>
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
                  <MicFilledIcon
                    opacity={topic.isRecorded ? 1 : 0.1}
                    color={topic.isRecorded ? COLORS.highlight : COLORS.text}
                  />
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
