import {BaseEntity} from './base-entity';

type Language =
  | 'en' // English
  | 'ko' // Korean
  | 'vi'; // Vietnamese

type AppSetting = {
  autoPlay: boolean;
};

export type User = {
  email: string;
  name: string;
  displayName: string;
  avatar: string;
  firstLanguage: Language;
  appSetting?: AppSetting;
} & BaseEntity;
