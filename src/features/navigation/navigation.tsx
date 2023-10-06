import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthNavigator} from './auth-navigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MainNavigator} from './main-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {keyStorage} from '../../consts';
import {setIsAuthenticate} from '../../redux/reducers/user.reducer';
import {useDispatch} from 'react-redux';
import {useRootSelector} from '../../redux/reducers';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.isAuthenticated]);

  return (
    <NavigationContainer>
      {!initialRender &&
        (user?.isAuthenticated ? <MainNavigator /> : <AuthNavigator />)}
    </NavigationContainer>
  );
}
