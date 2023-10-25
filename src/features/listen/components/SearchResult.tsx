import {FlatList, Text, View} from 'native-base';
import {SceneMap, TabView} from 'react-native-tab-view';
import {COLORS} from '../../../constants/design-system';
import CustomTabBarSearch from './CustomTabBarSearch';
import ListUser from './ListUser';
import {useMemo, useState} from 'react';
import ListGroup from './ListGroup';
import SearchNotFound from '../../../components/search-notfound';
import {useQuery} from '@tanstack/react-query';
import {listenService} from '../../../services/listen.service';
import {groupService} from '../../../services/group.service';

const SearchResult = ({textSearch}: {textSearch: string}) => {
  const {data: userProgress, error} = useQuery({
    queryKey: ['listen-user-progress'],
    queryFn: listenService.getUserProgress,
  });
  const {data: myGroups} = useQuery({
    queryKey: ['myGroups'],
    queryFn: groupService.getMyGroup,
  });
  const usersFilter = useMemo(() => {
    if (!userProgress) {
      return [];
    }
    return userProgress.filter(item =>
      [item.displayName, item.role, item.nativeLanguage].find(item =>
        item.toUpperCase().includes(textSearch.toUpperCase()),
      ),
    );
  }, [textSearch]);
  const groupFilter = useMemo(() => {
    if (!myGroups) {
      return [];
    }
    return myGroups.filter(item =>
      [item.name].find(item =>
        item.toUpperCase().includes(textSearch.toUpperCase()),
      ),
    );
  }, [textSearch]);
  const data = [
    {
      type: 'user',
      text: `Individual (${usersFilter.length})`,
    },

    {type: 'group', text: `Group (${groupFilter.length})`},
  ];

  const FirstRoute = () => (
    <FlatList
      keyboardShouldPersistTaps="always"
      data={data}
      nestedScrollEnabled={false}
      renderItem={({item}) => (
        <View>
          <Text color={COLORS.highlight} marginY={5}>
            {item.text}
          </Text>
          {item.type === 'user' ? (
            <ListUser users={usersFilter} />
          ) : (
            <ListGroup groups={groupFilter} />
          )}
        </View>
      )}
    />
  );

  const SecondRoute = () => (
    <View mt={4}>
      <ListUser users={usersFilter} />
    </View>
  );
  const ThirdRoute = () => (
    <View mt={4}>
      <ListGroup groups={groupFilter} />
    </View>
  );
  const renderScene = SceneMap({
    allScreen: FirstRoute || SearchNotFound,
    individualScreen: SecondRoute,
    groupScreen: ThirdRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'allScreen',
      title: `All (${usersFilter.length + groupFilter.length})`,
    },
    {key: 'individualScreen', title: `Individual (${usersFilter.length})`},
    {key: 'groupScreen', title: `Group (${groupFilter.length})`},
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
