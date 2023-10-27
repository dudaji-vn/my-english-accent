import {Vocabulary} from '../../types/vocabulary';

type FailedUpload = {
  recordUrl: {
    word?: string;
    sentence?: string;
  };
  vocabulary: Vocabulary;
};
export interface IRecordStore {
  completedIds: string[];
  failedUploads: FailedUpload[];
}
