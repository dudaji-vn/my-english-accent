import {Language, Role} from '../../types/user';

export interface IUserLoginDTO {
  userId: string;
  email: string;
}
export interface IUserRegisterDTO {
  userId: string;
  email: string;
  role: Role;
  nativeLanguage: Language;
  avatar: string;
  fullName: string;
  displayName: string;
}
