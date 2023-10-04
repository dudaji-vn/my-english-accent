import {NestedHeader} from '../../components/layout/nested-header';
import React from 'react';
import {SCREEN_NAMES} from '../../constants/screen';
import SettingsProfileScreen from '../settings/screens/settings-profile-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export const SettingNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        header: props => (
          <NestedHeader {...props} routes={['Settings', 'Edit profile']} />
        ),
      }}
      name={SCREEN_NAMES.settingsProfile}
      component={SettingsProfileScreen}
    />
  </Stack.Navigator>
);
