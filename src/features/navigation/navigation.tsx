import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {keyStorage} from '../../consts';
import {useRootSelector} from '../../redux/reducers';
import {setIsAuthenticate} from '../../redux/reducers/user.reducer';

import {MainNavigator} from './main-navigator';
import {AuthNavigator} from './auth-navigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function Navigation() {
  const user = useRootSelector(item => item.user);
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      // AsyncStorage.removeItem(keyStorage.accessToken);
      // await GoogleSignin.revokeAccess();
      // // Sign out from Google.
      // await GoogleSignin.signOut();
      try {
        const token = await AsyncStorage.getItem(keyStorage.accessToken);

        if (token) {
          setTimeout(() => {
            dispatch(setIsAuthenticate(true));
          }, 1000);
        }
        setTimeout(() => {
          setInitialRender(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, [user?.isAuthenticated]);

  return (
    <NavigationContainer>
      {!initialRender &&
        (user?.isAuthenticated ? <MainNavigator /> : <AuthNavigator />)}
    </NavigationContainer>
  );
}
