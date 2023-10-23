import {FlatList, View} from 'native-base';
import {
  Route,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';

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
      initialNumToRender={1}
      maxToRenderPerBatch={1}
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
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      renderItem={({item}) => (
        <View>
          <ListGroup />
        </View>
      )}
    />
  );

  const renderScene = (props: SceneRendererProps & {route: Route}) => {
    const {route} = props;

    if (route && index !== routes.indexOf(route)) {
      return <View />;
    }
    switch (route.key) {
      case 'individualScreen':
        return <FirstRoute />;
      case 'groupScreen':
        return <SecondRoute />;

      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);
  const routes: Route[] = [
    {key: 'individualScreen', title: 'Individual'},
    {key: 'groupScreen', title: 'Group'},
  ];
  return (
    <View marginY={5} marginX={5} flex={1}>
      <TabView
        lazy={false}
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
