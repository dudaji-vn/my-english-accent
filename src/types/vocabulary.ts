import {BaseEntity} from './base-entity';
import {Language} from './user';

export type Vocabulary = {
  text: Record<Language, string>;
  pronunciation: string;
  example: Record<Language, string>;
  type: string;
  category: string;
  isRecorded?: boolean;
} & BaseEntity;

export type GetVocabulariesParams = {
  page?: number;
  pageSize?: number;
  type?: string;
  category?: string;
  recordStatus?: 'recorded' | 'not-recorded' | 'all';
};
