import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenConfig} from '../../configs/screen-config';
import LoginScreen from '../auth/screens/login-screen';
import FirstLoginScreen from '../auth/screens/first-login-screen';
import {useRootSelector} from '../../redux/reducers';
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  const user = useRootSelector(item => item.user);
  if (user?.isAuthenticated) {
    return null;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screenConfig.name.login} component={LoginScreen} />
      <Stack.Screen
        name={screenConfig.name.firstLogin}
        component={FirstLoginScreen}
      />
    </Stack.Navigator>
  );
};
