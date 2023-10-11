import {View, Text, FlatList} from 'native-base';
import React from 'react';
import {SceneMap, TabView} from 'react-native-tab-view';
import CustomTabBarSearch from './CustomTabBarSearch';
import ListUser from './ListUser';
import {COLORS} from '../../../constants/design-system';
import UserCard from '../../../components/user-card';

const SearchResult = () => {
  const data = [
    {
      text: 'Individual (10)',
    },
    {text: 'Group (10)'},
  ];
  const FirstRoute = () => (
    <FlatList
      data={data}
      nestedScrollEnabled={false}
      renderItem={({item}) => (
        <View>
          <Text color={COLORS.highlight} marginY={5}>
            {item.text}
          </Text>
          <ListUser />
        </View>
      )}
    />
    // <View style={{backgroundColor: '#fff'}}>
    //   <Text color={COLORS.highlight} marginY={5}>

    //   </Text>
    //   <ListUser />
    //   <Text color={COLORS.highlight} marginY={5}>
    //      (10)
    //   </Text>
    //   <ListUser />
    // </View>
  );

  const SecondRoute = () => <View style={{flex: 1}} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All (10)'},
    {key: 'second', title: 'Individual (10)'},
    {key: 'third', title: 'Group (0)'},
  ]);
  return (
    <TabView
      swipeEnabled={false}
      renderTabBar={props => <CustomTabBarSearch {...props} />}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
};

export default SearchResult;
