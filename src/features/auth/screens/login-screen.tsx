import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Box, Button, Text, View} from 'native-base';
import React from 'react';
import {Logo} from '../../../components/icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {keyStorage} from '../../../consts';
import {setIsAuthenticate, setUser} from '../../../redux/reducers/user.reducer';
import {googleLogin} from '../login/google-login';
import {IUserLoginDTO} from '../../../interfaces/api/Auth';
import {authService} from '../../../services/auth.service';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import commonStyles from '../../../styles/common';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const onGoogleButtonPress = async () => {
    try {
      const googleUser = await googleLogin();

      if (googleUser.user.email! && googleUser.user.id) {
        dispatch(
          setUser({
            email: googleUser.user.email,
            avatar: googleUser.user.photo,
            userId: googleUser.user.id,
          }),
        );
        const userRequest: IUserLoginDTO = {
          email: googleUser.user.email,
          userId: googleUser.user.id,
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

        <TouchableOpacity
          style={style.googleButton}
          onPress={onGoogleButtonPress}>
          <Image source={require('../../../assets/images/GoogleLogo.png')} />
          <Text style={[style.textButton]}>Sign in with Google account</Text>
        </TouchableOpacity>
      </Box>
    </View>
  );
}
const style = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginTop: 60,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  textButton: {
    color: '#000',
    textAlign: 'center',
    marginLeft: 16,
    fontSize: 16,
  },
});
