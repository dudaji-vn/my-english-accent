import {NavigationProp, RouteProp} from '@react-navigation/native';
import {HStack} from 'native-base';
import React from 'react';

import {FlatList, View} from 'react-native';
import {Headphones} from 'react-native-feather';
import {AppProgress} from '../../../../components/app-progress';
import {Filter} from '../../../../components/filter';
import DownLoadIcon from '../../../../components/icons/download-icon';
import FillIcon from '../../../../components/icons/fill-icon';
import InfoIcon from '../../../../components/icons/info-icon';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {Topic, TopicCard} from '../../../../components/topic-card';
import {WordItem} from '../../../../components/word-item';
import RowUserAvatar from '../../components/RowUserAvatar';
import PlayAllIcon from '../../../../components/icons/play-all-icon';
import RowGroup from '../../components/RowGroup';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';

const designerImg = require('../../../../assets/images/Designer.png');

const generalImg = require('../../../../assets/images/Chat.png');

type Props = {
  route: RouteProp<any>;
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
const words = [
  'Keyword1',
  'Keyword2',
  'Keyword3',
  'Keyword4',
  'Keyword5',
  'Keyword6',
  'Keyword7',
  'Keyword8',
  'Keyword9',
  'Keyword10',
  'Keyword11',
];
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
  const typeScreen = route.params?.typeScreen;

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
          {typeScreen === 'group' ? <RowGroup /> : <RowUserAvatar />}
          <InfoIcon />
        </HStack>

        <DownLoadIcon />
      </HStack>
      <AppProgress
        progress={40}
        startIcon={<Headphones color="white" width={20} height={20} />}
      />
      <HStack my={6} space={4} justifyContent="space-between">
        {data.map((topic, index) => (
          <TopicCard
            minimalOnInActive={index === 1}
            isActive={index === 0}
            key={index}
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
        numColumns={1}
        horizontal={false}
        data={words}
        renderItem={({item}) => (
          <View style={{marginBottom: 10}}>
            <WordItem
              word={item}
              status={'disabled'}
              leftElement={<FillIcon isFill />}
            />
          </View>
        )}
        keyExtractor={item => item}
      />
    </ScreenWrapper>
  );
};

export default ListenDetailScreen;
