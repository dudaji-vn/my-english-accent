import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import WordsRecordScreen from '../record/screens/words-record-screen';
import {MyRecordListenScreen} from '../record/screens/my-record-listen-screen';
import RecordErrorScreen from '../record/screens/record-error-screen';
const Stack = createNativeStackNavigator();

export const RecordNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={SCREEN_NAMES.wordsRecord}
      component={WordsRecordScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={SCREEN_NAMES.myRecordListen}
      component={MyRecordListenScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={SCREEN_NAMES.recordError}
      component={RecordErrorScreen}
    />
  </Stack.Navigator>
);
