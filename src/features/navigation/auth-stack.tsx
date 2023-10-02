import {ListenScreen} from '../listen/screens';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenConfig} from '../../configs/screen-config';
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screenConfig.name.listen} component={ListenScreen} />
    </Stack.Navigator>
  );
};
