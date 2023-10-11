import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import {COLORS} from '../../../constants/design-system';

const CustomTabBarSearch = memo<{
  navigationState: NavigationState<Route>;
  jumpTo: (key: string) => void;
}>(({navigationState, jumpTo}) => {
  const {routes, index} = navigationState;

  return (
    <View style={styles.tabBar}>
      {routes.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={[styles.tabItem, i === index && styles.activeTab]}
          onPress={() => jumpTo(route.key)}>
          <Text
            style={
              i === index
                ? [styles.tabText, styles.tabTextActive]
                : styles.tabText
            }>
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    backgroundColor: COLORS.stroke,
    height: 2,
    alignItems: 'flex-end',
  },
  tabItem: {flex: 1, alignItems: 'center', position: 'relative'},
  activeTab: {
    backgroundColor: COLORS.highlight,
    height: 4,
  },
  tabText: {
    position: 'absolute',
    fontSize: 16,
    bottom: 8,
    fontWeight: '400',
    color: COLORS.text,
  },
  tabTextActive: {
    fontWeight: '600',
  },
});

export default CustomTabBarSearch;
