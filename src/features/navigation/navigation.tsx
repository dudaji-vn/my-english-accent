import {MainStack} from './main-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

export function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
