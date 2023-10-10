import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

import {googleClientId} from '../../../configs';
GoogleSignin.configure({
  webClientId: googleClientId,
});

export const googleLogin = async (): Promise<User> => {
  // Check if your device supports Google Play
  //await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const googleSignin = await GoogleSignin.signIn();

  return googleSignin;
};
