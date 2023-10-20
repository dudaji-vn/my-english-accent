import {ImageSourcePropType} from 'react-native';
import {Language} from '../types/user';
export const VNFlag = require('../assets/images/VietNamFlagIcon.png');
export const KRFlag = require('../assets/images/KoreanFlagIcon.png');

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

export const vocabularyEndpoint = {
  base: 'api/vocabulary',
};

export const recordEndpoint = {
  base: 'api/record',
};

export const listenEndpoint = {
  getUserProgress: 'api/listen/getUserProgress',
};

export const groupEndpoint = {
  base: 'api/group',
  myGroups: 'api/group/myGroups',
  createGroup: 'api/group/createGroup',
};

export const flagMap: Record<
  Language,
  | {
      alt: string;
      src: ImageSourcePropType;
    }
  | undefined
> = {
  en: undefined,
  ko: {
    alt: 'Korean Flag',
    src: KRFlag,
  },
  vi: {
    alt: 'Vietnamese Flag',
    src: VNFlag,
  },
};
