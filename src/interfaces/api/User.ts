import {Language} from '../../types/user';

export interface IUser {
  _id: string;
  displayName: string;
  role: string;
  avatar: string;
  nativeLanguage: Language;
  fullName: string;
}
export interface IUserProgress extends IUser {
  totalListen: number;
  totalRecord: number;
}
export interface IAddOrRemoveFavoriteUser {
  userId: string;
  //type: add |remove
  type: string;
}
