import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

import {googleClientId} from '../../../configs';
import {IUserLoginDTO} from '../../../interfaces/api/Auth';
GoogleSignin.configure({
  webClientId: googleClientId,
});

export const googleLogin = async (): Promise<User> => {
  // Check if your device supports Google Play
  //await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const googleSignin = await GoogleSignin.signIn();

  // Create a Google credential with the token
  //const googleCredential = auth.GoogleAuthProvider.credential(x.idToken);
  // Sign-in the user with the credential

  return googleSignin;
};
