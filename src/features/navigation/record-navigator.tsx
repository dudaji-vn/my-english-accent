import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import WordsRecordScreen from '../record/screens/words-record-screen';
const Stack = createNativeStackNavigator();

export const RecordNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={SCREEN_NAMES.wordsRecord}
      component={WordsRecordScreen}
    />
  </Stack.Navigator>
);
