import {MainNavigator} from './main-navigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

export function Navigation() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
