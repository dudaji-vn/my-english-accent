import {ImageSourcePropType} from 'react-native';
import {Language} from '../types/user';
const VNFlag = require('../assets/images/VietNamFlagIcon.png');
const KRFlag = require('../assets/images/KoreanFlagIcon.png');

// import {API_URL} from '@env';
export const baseApiUrl = 'http://10.0.100.14:5000/';
export const googleClientId =
  '87150114919-c8fv6vqb433lcmb3n6vc92d2q5688nd4.apps.googleusercontent.com';

export const authEndpoint = {
  login: 'api/auth/login',
  register: 'api/auth/register',
  profile: 'api/auth/profile',
};

export const userEndpoint = {
  base: 'api/user',
};

export const flagMap: Record<Language, ImageSourcePropType | undefined> = {
  en: undefined,
  ko: KRFlag,
  vi: VNFlag,
};
