import {BaseEntity} from './base-entity';
import {Language} from './user';

export type Dictionary = {
  text: Record<Language, string>;
  pronunciation: string;
  example: Record<Language, string>;
  wordType: string;
  category: string;
} & BaseEntity;
