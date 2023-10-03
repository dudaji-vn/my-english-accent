import LoginScreen from '../auth/screens/login-screen';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_NAMES.login} component={LoginScreen} />
    </Stack.Navigator>
  );
};
