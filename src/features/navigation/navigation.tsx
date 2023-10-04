import {MainNavigator} from './main-navigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './auth-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {keyStorage} from '../../consts';
import {useRootSelector} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {setIsAuthenticate} from '../../redux/reducers/user.reducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function Navigation() {
  const user = useRootSelector(item => item.user);
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    // AsyncStorage.removeItem(keyStorage.accessToken);

    const fetchAccessToken = async () => {
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
        setInitialRender(false);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, [user?.isAuthenticated]);

  return (
    <NavigationContainer>
      {!initialRender &&
        (user?.isAuthenticated ? <MainNavigator /> : <AuthStack />)}
    </NavigationContainer>
  );
}
