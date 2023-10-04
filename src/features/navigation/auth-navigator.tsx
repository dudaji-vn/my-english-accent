import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import {useRootSelector} from '../../redux/reducers';
import FirstLoginScreen from '../auth/screens/first-login-screen';
import LoginScreen from '../auth/screens/login-screen';
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  const user = useRootSelector(item => item.user);
  if (user?.isAuthenticated) {
    return null;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.login} component={LoginScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.firstLogin}
        component={FirstLoginScreen}
      />
    </Stack.Navigator>
  );
};
