import {IUser} from './User';

export interface IUserInvite extends IUser {
  isInvite: boolean;
}
export interface IGroup {
  _id: string;
  name: string;
  members: IGroupMember[];
  progress?: number;
}

export interface IFormAddGroup {
  members: string[];
  name: string;
  avatar: string;
}

export interface IGroupMember extends IUser {
  remainingCount?: string;
}
