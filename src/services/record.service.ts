import {recordEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {CreateRecordDTO, Record} from '../types/record';

import httpService from './http.service';

class RecordService {
  async createRecord(data: CreateRecordDTO): Promise<Record> {
    const res = await httpService.post<IApiResponse<Record>>(
      recordEndpoint.base,
      data,
    );
    return res.data.data;
  }
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
