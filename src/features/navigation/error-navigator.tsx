import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import RecordErrorScreen from '../record/screens/record-error-screen';
const Stack = createNativeStackNavigator();

export const ErrorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.recordError}
        component={RecordErrorScreen}
      />
    </Stack.Navigator>
  );
};
