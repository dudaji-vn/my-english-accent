import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {keyStorage} from '../../consts';
import {useRootSelector} from '../../redux/reducers';
import {setIsAuthenticate, setUser} from '../../redux/reducers/user.reducer';
import {AuthNavigator} from './auth-navigator';
import {MainNavigator} from './main-navigator';
import {authService} from '../../services/auth.service';

export function Navigation() {
  const user = useRootSelector(item => item.user);
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
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
  useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: user?.isAuthenticated,
    onSuccess: data => {
      dispatch(
        setUser({
          profile: data,
        }),
      );
    },
    onError: error => {
      console.log('get profile error', error);
    },
  });

  return (
    <NavigationContainer>
      {!initialRender &&
        (user?.isAuthenticated ? <MainNavigator /> : <AuthNavigator />)}
    </NavigationContainer>
  );
}
