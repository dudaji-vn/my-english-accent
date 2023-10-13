import {BottomNavigator} from './bottom-navigator';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import {SettingNavigator} from './settings-navigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListenNavigator} from './listen-navigator';
import {RecordNavigator} from './record-navigator';
const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="bottom-navigator" component={BottomNavigator} />
      <Stack.Screen
        name={SCREEN_NAMES.settingsNavigator}
        component={SettingNavigator}
      />
      <Stack.Screen
        name={SCREEN_NAMES.listeningsNavigator}
        component={ListenNavigator}
      />
      <Stack.Screen
        name={SCREEN_NAMES.recordNavigator}
        component={RecordNavigator}
      />
    </Stack.Navigator>
  );
};
