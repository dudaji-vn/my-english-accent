import {Box, Button, Text, View} from 'native-base';

import {Logo} from '../../../components/icons';
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
    <View
      bg="highlight"
      height="full"
      justifyContent="center"
      alignItems="center">
      <Box alignItems="center">
        <Logo />
        <Button rounded="lg" mt="10" onPress={onGoogleButtonPress} bg="white">
          <Text>Sign in with Google account </Text>
        </Button>
      </Box>
    </View>
  );
}
