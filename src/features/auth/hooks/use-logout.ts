import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {keyStorage} from '../../../consts';
import {setIsAuthenticate, setUser} from '../../../redux/reducers/user.reducer';

import {googleClientId} from '../../../configs';

export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    GoogleSignin.configure({
      webClientId: googleClientId,
    });
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    dispatch(setUser(null));
    dispatch(setIsAuthenticate(false));
    AsyncStorage.removeItem(keyStorage.accessToken);
  };
  return {logout};
};
