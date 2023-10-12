import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAMES} from '../../../../constants/screen';
import IndividualTab from './individual-tab';

import ListenDetailScreen from './listen-detail-screen';
import ListAudioListenScreen from './list-audio-screen';

const Stack = createNativeStackNavigator();

export const IndividualNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.individual} component={IndividualTab} />
      <Stack.Screen
        name={SCREEN_NAMES.listenDetailScreen}
        component={ListenDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.listAudioListenScreen}
        component={ListAudioListenScreen}
      />
    </Stack.Navigator>
  );
};
