import {ImageSourcePropType} from 'react-native';
import {Category, Language} from '../types/user';
import {Topic} from '../components/topic-card';
export const VNFlag = require('../assets/images/VietNamFlagIcon.png');
export const KRFlag = require('../assets/images/KoreanFlagIcon.png');
const designerImg = require('../assets/images/Designer.png');
const developerImg = require('../assets/images/Dev.png');
const generalImg = require('../assets/images/Chat.png');
const otherImg = require('../assets/images/Other.png');

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
  myKeyword: 'api/user/myKeyword',
  addKeyword: 'api/user/keyword/add',
  deleteKeyword: 'api/user/keyword/delete',
};

export const vocabularyEndpoint = {
  base: 'api/vocabulary',
};

export const recordEndpoint = {
  base: 'api/record',
};

export const listenEndpoint = {
  getUserProgress: 'api/listen/getUserProgress',
  getListenDetail: 'api/listen/listenDetail',
  getListenDetailInGroup: 'api/listen/listenDetailInGroup',
  getAudioList: 'api/listen/audioList',
  listenRecord: 'api/listen/listenRecord',
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

export const category = {
  general: 'general',
  designer: 'designer',
  developer: 'developer',
};

export const initTopics: Record<Category, Topic> = {
  general: {
    _id: '0',
    name: 'General',
    image: generalImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
  developer: {
    _id: '1',
    name: 'Developer',
    image: developerImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
  designer: {
    _id: '2',
    name: 'Designer',
    image: designerImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
  others: {
    _id: '2',
    name: 'Other',
    image: otherImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
};
