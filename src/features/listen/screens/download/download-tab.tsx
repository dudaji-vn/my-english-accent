import {FlatList, View} from 'native-base';
import {SceneMap, TabView} from 'react-native-tab-view';

import {useState} from 'react';
import CustomTabBarSearch from '../../components/CustomTabBarSearch';
import ListGroup from '../../components/ListGroup';
import ListUser from '../../components/ListUser';

const DownloadTab = () => {
  const data = [
    {
      type: 'user',
      text: 'Individual',
    },

    {type: 'group', text: 'Group'},
  ];
  const FirstRoute = () => (
    <FlatList
      data={data}
      nestedScrollEnabled={false}
      renderItem={({item}) => (
        <View>
          <ListUser />
        </View>
      )}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={data}
      nestedScrollEnabled={false}
      renderItem={({item}) => (
        <View>
          <ListGroup />
        </View>
      )}
    />
  );

  const renderScene = SceneMap({
    individualScreen: FirstRoute,
    groupScreen: SecondRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'individualScreen', title: 'Individual'},
    {key: 'groupScreen', title: 'Group'},
  ]);
  return (
    <View marginY={5} marginX={5} flex={1}>
      <TabView
        swipeEnabled={false}
        renderTabBar={props => <CustomTabBarSearch {...props} />}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default DownloadTab;
