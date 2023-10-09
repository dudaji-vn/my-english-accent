import {
  CogIcon,
  GamepadIcon,
  HeadphoneIcon,
  MicrophoneIcon,
} from '../../components/icons';

import {Navbar} from '../../components/navbar';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import SettingsScreen from '../settings/screens/settings-screen';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainRecordScreen from '../record/screens/main-record-screen';
import ExampleComponentsScreen from '../example/screens/example-components-screen';
import ListenScreen from '../listen/screens/listen-screen';
import ListenNavigator from './listen-navigator';

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

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
      tabBar={props => <Navbar routeIconsMap={routeIconsMap} {...props} />}>
      <Tab.Screen
        options={{headerShown: false}}
        name={SCREEN_NAMES.listen}
        component={ListenNavigator}
      />
      <Tab.Screen
        name={SCREEN_NAMES.record}
        options={{
          title: 'Record',
        }}
        component={MainRecordScreen}
      />
      <Tab.Screen
        name={SCREEN_NAMES.game}
        component={ExampleComponentsScreen}
      />
      <Tab.Screen
        name={SCREEN_NAMES.settings}
        options={{
          title: 'Setting',
        }}
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
