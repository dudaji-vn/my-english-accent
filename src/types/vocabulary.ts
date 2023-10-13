import {BaseEntity} from './base-entity';
import {Language} from './user';

export type Vocabulary = {
  text: Record<Language, string>;
  pronunciation: string;
  example: Record<Language, string>;
  type: string;
  category: string;
} & BaseEntity;
