import {NavigationProp} from '@react-navigation/native';
import React from 'react';

import {Text, View} from 'native-base';
import {TabData, Tabs} from '../../../components/tabs';
import Record from '../components/record';

type Props = {
  navigation: NavigationProp<any>;
};
const tabs: TabData[] = [
  {
    key: 'Record',
    title: 'Record',
    content: () => <Record />,
  },
  {
    key: 'My record list',
    title: 'My record list',
    content: () => <Text>This is Tab 2</Text>,
  },
];

const MainRecordScreen = ({}: Props) => {
  return (
    <View flex={1} bg="white" px={4}>
      <Tabs tabs={tabs} />
    </View>
  );
};

export default MainRecordScreen;
