import {FlatList, Text, View} from 'native-base';
import {SceneMap, TabView} from 'react-native-tab-view';
import {COLORS} from '../../../constants/design-system';
import CustomTabBarSearch from './CustomTabBarSearch';
import ListUser from './ListUser';
import {useState} from 'react';
import ListGroup from './ListGroup';
import SearchNotFound from '../../../components/search-notfound';

const SearchResult = () => {
  const data = [
    {
      type: 'user',
      text: 'Individual (10)',
    },

    {type: 'group', text: 'Group (10)'},
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
          {item.type === 'user' ? <ListUser users={[]} /> : <ListGroup />}
        </View>
      )}
    />
  );

  const SecondRoute = () => <View style={{flex: 1}} />;

  const renderScene = SceneMap({
    allScreen: FirstRoute || SearchNotFound,
    individualScreen: SecondRoute,
    groupScreen: FirstRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'allScreen', title: 'All (10)'},
    {key: 'individualScreen', title: 'Individual (10)'},
    {key: 'groupScreen', title: 'Group (0)'},
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
