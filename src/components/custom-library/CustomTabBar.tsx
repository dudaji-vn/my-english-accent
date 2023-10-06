import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import {colors} from '../../consts';

const CustomTabBar = <T extends Route>({
  navigationState,
  jumpTo,
}: SceneRendererProps & {navigationState: NavigationState<T>}) => {
  const {routes, index} = navigationState;

  return (
    <View style={styles.tabBar}>
      {routes.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={[
            styles.tabItem,
            i <= index ? styles.activeTab : styles.normalTab,
          ]}
          onPress={() => jumpTo(route.key)}>
          <Text style={styles.tabText}>{route.title}</Text>
        </TouchableOpacity>
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
    gap: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    height: 4,
    backgroundColor: colors.highlight,

    borderRadius: 80,
  },
  normalTab: {
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 80,
  },
  tabText: {
    fontSize: 16,
  },
});

export default CustomTabBar;
