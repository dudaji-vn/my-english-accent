import {
  CogIcon,
  GamepadIcon,
  HeadphoneIcon,
  MicrophoneIcon,
} from '../../components/icons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Navbar} from '../../components/navbar';
import {SCREEN_NAMES} from '../../constants/screen';
import {ListenScreen} from '../listen/screens';
import SettingsScreen from '../settings/screens/settings-screen';

const Tab = createBottomTabNavigator();

type RouteIconsMap = {
  [key: string]: React.FC;
};
const routeIconsMap = {
  listen: HeadphoneIcon,
  record: MicrophoneIcon,
  game: GamepadIcon,
  settings: CogIcon,
} as RouteIconsMap;

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
      tabBar={props => <Navbar routeIconsMap={routeIconsMap} {...props} />}>
      <Tab.Screen name={SCREEN_NAMES.listen} component={ListenScreen} />
      <Tab.Screen name={SCREEN_NAMES.record} component={ListenScreen} />
      <Tab.Screen name={SCREEN_NAMES.game} component={ListenScreen} />
      <Tab.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: 'Setting',
        }}
        name={SCREEN_NAMES.settings}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 58,
  },
});
