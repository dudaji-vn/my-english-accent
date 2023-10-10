import {User} from '../../types/user';

export interface IUserStore {
  email: string;
  avatar: string;
  isAuthenticated: false;
  profile: User;
  userId: string;
  name: string;
}
