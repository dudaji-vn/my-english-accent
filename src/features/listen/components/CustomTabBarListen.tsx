import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import {colors} from '../../../consts';
import IndividualIcon from '../../../components/icons/individual-icon';
import GroupIcon from '../../../components/icons/group-icon';
import FavoriteIcon from '../../../components/icons/favorite-icon';
import DownloadIcon from '../../../components/icons/download-icon';
import IndividualIconActive from '../../../components/icons/invidual-icon-active';
import {Pressable} from 'native-base';
import GroupIconActive from '../../../components/icons/group-icon-active';
import FavoriteIconActive from '../../../components/icons/favorite-icon-active';
import DownLoadIconActive from '../../../components/icons/download-icon-active';

const CustomTabBarListen = <T extends Route>({
  navigationState,
  jumpTo,
}: SceneRendererProps & {navigationState: NavigationState<T>}) => {
  const {routes, index} = navigationState;

  console.log(routes);
  const icons = [
    {
      normal: <IndividualIcon />,
      active: <IndividualIconActive />,
    },
    {
      normal: <GroupIcon />,
      active: <GroupIconActive />,
    },
    {
      normal: <FavoriteIcon />,
      active: <FavoriteIconActive />,
    },
    {
      normal: <DownloadIcon />,
      active: <DownLoadIconActive />,
    },
  ];

  return (
    <View style={styles.tabBar}>
      {routes.map((route, id) => (
        <Pressable
          style={index === id && styles.activeTab}
          key={route.key}
          onPress={() => jumpTo(route.key)}>
          {index === id ? icons[id]?.active : icons[id]?.normal}
          {index === id && <Text style={styles.tabText}>{route.title}</Text>}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20,
    gap: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.highlight,
    flexDirection: 'row',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
  },
  normalTab: {
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 80,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CustomTabBarListen;
