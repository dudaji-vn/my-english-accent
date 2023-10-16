import {BaseEntity} from './base-entity';
import {User} from './user';
import {Vocabulary} from './vocabulary';

export type Record = {
  _id: string;
  recordUrl: {
    word: string;
    sentence: string;
  };
  vocabulary: Vocabulary;
  user: User;
} & BaseEntity;

export type CreateRecordDTO = {
  recordUrl: {
    word?: string;
    sentence?: string;
  };
  vocabularyId: string;
};
