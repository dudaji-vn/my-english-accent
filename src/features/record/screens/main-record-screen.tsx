import {
  NavigationProp,
  RouteProp,
  useIsFocused,
} from '@react-navigation/native';
import React from 'react';

import {View} from 'native-base';
import {TabData, Tabs} from '../../../components/tabs';
import MyRecordList from '../components/my-record-list';
import Record from '../components/record';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

const MainRecordScreen = ({navigation, route}: Props) => {
  const isFocused = useIsFocused();
  const tabs: TabData[] = React.useMemo(
    () => [
      {
        key: 'Record',
        title: 'Record',
        content: ({jumpTo}) => (
          <Record navigation={navigation} route={route} jumpTo={jumpTo} />
        ),
      },
      {
        key: 'My record list',
        title: 'My record list',
        content: ({jumpTo}) => (
          <MyRecordList navigation={navigation} route={route} jumpTo={jumpTo} />
        ),
      },
    ],
    [navigation, route],
  );
  return (
    <View flex={1} bg="white">
      {isFocused && <Tabs tabs={tabs} />}
    </View>
  );
};

export default MainRecordScreen;
