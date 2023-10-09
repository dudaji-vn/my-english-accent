import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants/screen';
import {keyStorage} from '../../../consts';
import {setIsAuthenticate, setUser} from '../../../redux/reducers/user.reducer';

export const useLogout = (navigation: any) => {
  const dispatch = useDispatch();

  const logout = async () => {
    AsyncStorage.removeItem(keyStorage.accessToken);
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    dispatch(setUser(null));
    dispatch(setIsAuthenticate(false));
    navigation.navigate(SCREEN_NAMES.login);
  };
  return {logout};
};
