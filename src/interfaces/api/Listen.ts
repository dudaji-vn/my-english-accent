import {Group} from '../../types/group';
import {Record} from '../../types/record';
import {Category, User} from '../../types/user';

export interface IParamListenDetail {
  userId: string | undefined;
  category?: 'general' | 'developer' | 'designer' | string;
  sortBy?: 'latestFile' | 'completedRecently';
  type?: 'Verb' | 'Noun' | 'Place / Time';
  groupId?: string;
}
export interface IParamAudio {
  recordId: string;
  userId?: string;
  groupId?: string;
  vocabularyId?: string;
}
export interface IListenDetailResponse {
  user?: User;
  group?: Group;
  recordInfo: {
    totalRecord: number;
    category: Category;
    records: {
      _id: string;
      isListen: boolean;
      vocabulary: {
        text: {
          en: string;
        };
      };
    }[];
  }[];
}

export interface IGetAudioList {
  currentRecord: Record;
  nextRecord: Record[];
}
