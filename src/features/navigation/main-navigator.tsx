import {BottomNavigator} from './bottom-navigator';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import {SettingNavigator} from './settings-navigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WordsRecordScreen from '../record/screens/words-record-screen';
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
        name={SCREEN_NAMES.recordNavigator}
        component={WordsRecordScreen}
      />
    </Stack.Navigator>
  );
};
