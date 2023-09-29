import {Image, Text, View} from 'react-native';

import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {User} from '../../../types/user';
import {googleLogin} from '../login/google-login';

export default function LoginScreen() {
  const [userInfo, setUserInfo] = React.useState<User>({} as User);
  const onGoogleButtonPress = async (): Promise<User> => {
    const googleUser = await googleLogin();

    // main flow login
    //- check user in db(firebase) by googleUser uid
    // -> if not exist(mean first login) -> redirect to first login screen
    // -> if exist -> redirect to home screen

    // temp for testing
    const user: User = {
      id: googleUser.uid,
      name: googleUser.displayName || '',
      displayName: googleUser.displayName || '',
      email: googleUser.email!,
      avatar: googleUser.photoURL || '',
      firstLanguage: 'vi',
    };
    setUserInfo(user);
    return user;
  };
  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: userInfo.avatar}}
        />
        <Text>{userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
      </View>
    </View>
  );
}
