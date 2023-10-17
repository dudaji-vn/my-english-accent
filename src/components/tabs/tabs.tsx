import {Box, Pressable} from 'native-base';
import React from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import {COLORS} from '../../constants/design-system';
const initialLayout = {
  width: Dimensions.get('window').width,
};
export type TabData = {
  key: string;
  title: string;
  content: React.ComponentType<any>;
};
type Props = {
  tabs: TabData[];
};

export const Tabs = ({tabs}: Props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabs);
  const renderScene = SceneMap(
    tabs.reduce((acc, tab) => {
      // @ts-ignore
      acc[tab.key] = tab.content;
      return acc;
    }, {}),
  );

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<TabData>;
    },
  ) => {
    return (
      <Box flexDirection="row" px={5}>
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? COLORS.text : COLORS.stroke;
          const borderColor = index === i ? COLORS.highlight : COLORS.stroke;
          return (
            <Pressable
              key={i}
              onPress={() => {
                setIndex(i);
              }}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center">
              <Box p={3}>
                <Animated.Text
                  style={[
                    styles.tabText,
                    {
                      color,
                    },
                  ]}>
                  {route.title}
                </Animated.Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      lazy
      swipeEnabled={false}
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};
const styles = StyleSheet.create({
  tabText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
