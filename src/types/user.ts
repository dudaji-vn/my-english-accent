import {BaseEntity} from './base-entity';

export type Language =
  | 'en' // English
  | 'ko' // Korean
  | 'vi'; // Vietnamese
export type Position = 'developer' | 'designer' | 'others';
type AppSetting = {
  autoPlay: boolean;
};

export type User = {
  email: string;
  name: string;
  displayName: string;
  avatar: string;
  firstLanguage: Language;
  position: Position;
  appSetting?: AppSetting;
} & BaseEntity;
