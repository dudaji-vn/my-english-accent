import {Language} from '../../types/user';

export interface IUser {
  _id: string;
  displayName: string;
  role: string;
  avatar: string;
  nativeLanguage: Language;
}
export interface IUserProgress extends IUser {
  totalListen: number;
  totalRecord: number;
}
