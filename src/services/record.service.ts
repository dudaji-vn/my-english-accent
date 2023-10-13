import {recordEndpoint} from '../configs';

import httpService from './http.service';

class RecordService {
  async getRecordProgress(): Promise<{
    recordProgress: {
      _id: string;
      count: number;
    }[];
    vocabularyCountByCategory: {
      _id: string;
      count: number;
    }[];
  }> {
    const res = await httpService.get<any>(recordEndpoint.base + '/progress');
    return res.data.data;
  }
}

export const recordService = new RecordService();
