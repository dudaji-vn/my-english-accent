import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import MainLayout from '../../../components/layout/main-layout';
import {Topic, TopicCard} from '../../../components/topic-card';
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
    totalWords: 100,
    numOfAchieved: 10,
  },
];

const MainRecordScreen = ({}: Props) => {
  return (
    <MainLayout>
      {data.map((topic, index) => (
        <TopicCard isActive={index === 0} key={index} topic={topic} />
      ))}
    </MainLayout>
  );
};

export default MainRecordScreen;
