import queryString from 'query-string';
import {recordEndpoint} from '../configs';
import {IApiResponse, IPaginationResponse} from '../interfaces/api/Http';
import {CreateRecordDTO, GetRecordsParams, Record} from '../types/record';

import httpService from './http.service';

class RecordService {
  async createRecord(data: CreateRecordDTO): Promise<Record> {
    const res = await httpService.post<IApiResponse<Record>>(
      recordEndpoint.base,
      data,
    );
    return res.data.data;
  }
  async getMyRecords(
    params: GetRecordsParams,
  ): Promise<IPaginationResponse<Record>> {
    const searchParams = queryString.stringify(params);
    console.log(recordEndpoint.base + '/me' + '?' + searchParams);
    const res = await httpService.get<
      IApiResponse<IPaginationResponse<Record>>
    >(recordEndpoint.base + '/me' + '?' + searchParams);

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
