import {BaseEntity} from './base-entity';

export type Language =
  | 'en' // English
  | 'ko' // Korean
  | 'vi'; // Vietnamese
export type Role = 'developer' | 'designer' | 'others';
type AppSetting = {
  autoPlay: boolean;
};

export type User = {
  email: string;
  fullName: string;
  displayName: string;
  avatar: string;
  nativeLanguage: Language;
  role: Role;
  appSetting?: AppSetting;
  autoDownload?: boolean;
} & BaseEntity;

export type Category = 'general' | 'developer' | 'designer' | 'others';
export type Keyword = {
  text: string;
  _id: string;
};
