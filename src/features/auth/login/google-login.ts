import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '87150114919-c8fv6vqb433lcmb3n6vc92d2q5688nd4.apps.googleusercontent.com',
});
export const googleLogin = async (): Promise<FirebaseAuthTypes.User> => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  const {user} = await auth().signInWithCredential(googleCredential);
  return user;
};
