import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Box, Button, Text, View} from 'native-base';
import React from 'react';
import {Logo} from '../../../components/icons';
import {IUserLoginDTO} from '../../../interfaces/api/Auth';
import {authService} from '../../../services/auth.service';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {keyStorage} from '../../../consts';
import {setIsAuthenticate, setUser} from '../../../redux/reducers/user.reducer';
import {googleLogin} from '../login/google-login';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const onGoogleButtonPress = async () => {
    try {
      const googleUser = await googleLogin();

      if (googleUser.email! && googleUser.uid) {
        dispatch(
          setUser({
            email: googleUser.email,
            avatar: googleUser.photoURL,
            userId: googleUser.uid,
          }),
        );
        const userRequest: IUserLoginDTO = {
          email: googleUser.email,
          userId: googleUser.uid,
        };
        authService
          .login(userRequest)
          .then(token => {
            dispatch(setIsAuthenticate(true));
            AsyncStorage.setItem(keyStorage.accessToken, token);
            console.log('login success');
            console.log(token);
          })
          .catch(err => {
            navigation.navigate('firstLogin');
            console.log(err.message);
          });
      }
    } catch (err) {
      console.log('Error authentication');
      console.log(err);
    }
  };
  return (
    <View
      bg="highlight"
      height="full"
      justifyContent="center"
      alignItems="center">
      <Box alignItems="center">
        <Logo />
        <Button rounded="lg" mt="10" onPress={onGoogleButtonPress} bg="white">
          <Text>Sign in with Google account</Text>
        </Button>
      </Box>
    </View>
  );
}
