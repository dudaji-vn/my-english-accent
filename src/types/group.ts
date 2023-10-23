import {BaseEntity} from './base-entity';
import {User} from './user';

export type Group = {
  name: string;
  avatar?: string;
  members: User[];
  creator: User;
} & BaseEntity;
