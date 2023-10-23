import {Record} from '../../types/record';
import {Category} from '../../types/user';

export interface IParamListenDetail {
  userId: string | undefined;
  category?: 'general' | 'developer' | 'designer' | string;
  sortBy?: 'latestFile' | 'completedRecently';
  type?: 'Verb' | 'Noun' | 'Place / Time';
}
export interface IListenDetailResponse {
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
}

export interface IGetAudioList {
  currentRecord: Record;
  nextRecord: Record[];
}
