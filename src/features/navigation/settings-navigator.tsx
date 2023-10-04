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
        // eslint-disable-next-line react/no-unstable-nested-components
        header: props => (
          <NestedHeader
            {...props}
            routes={[
              {
                name: SCREEN_NAMES.settings,
                displayName: 'Setting',
              },
              {
                name: SCREEN_NAMES.settingsProfile,
                displayName: 'Edit Profile',
              },
            ]}
          />
        ),
      }}
      name={SCREEN_NAMES.settingsProfile}
      component={SettingsProfileScreen}
    />
  </Stack.Navigator>
);
