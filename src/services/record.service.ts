import queryString from 'query-string';
import {recordEndpoint} from '../configs';
import {IApiResponse, IPaginationResponse} from '../interfaces/api/Http';
import {
  CreateRecordDTO,
  GetRecordsParams,
  Record,
  UpdateRecordDTO,
} from '../types/record';

import httpService from './http.service';

class RecordService {
  async createRecord(data: CreateRecordDTO): Promise<Record> {
    const res = await httpService.post<IApiResponse<Record>>(
      recordEndpoint.base,
      data,
    );
    return res.data.data;
  }

  async updateRecord({_id, ...data}: UpdateRecordDTO): Promise<Record> {
    const res = await httpService.patch<IApiResponse<Record>>(
      recordEndpoint.base + '/' + _id,
      data,
    );
    return res.data.data;
  }

  async deleteRecord(_id: string): Promise<Record> {
    const res = await httpService.delete<IApiResponse<Record>>(
      recordEndpoint.base + '/' + _id,
    );
    return res.data.data;
  }
  async getMyRecords(
    params: GetRecordsParams,
  ): Promise<IPaginationResponse<Record>> {
    const searchParams = queryString.stringify(params);
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
  async sendRecordToGroup({
    recordId,
    groupId,
  }: {
    recordId: string;
    groupId: string;
  }): Promise<Record> {
    const res = await httpService.post<IApiResponse<Record>>(
      recordEndpoint.base + '/' + recordId + '/' + groupId,
    );
    return res.data.data;
  }

  async unsendRecordFromGroup({
    recordId,
    groupId,
  }: {
    recordId: string;
    groupId: string;
  }): Promise<Record> {
    const res = await httpService.delete<IApiResponse<Record>>(
      recordEndpoint.base + '/' + recordId + '/' + groupId,
    );
    return res.data.data;
  }

  async sendAllRecordsToGroup(groupId: string): Promise<Record[]> {
    console.log('😀', groupId);
    const res = await httpService.post<IApiResponse<Record[]>>(
      recordEndpoint.base + '/send-all/' + groupId,
    );
    return res.data.data;
  }
}

export const recordService = new RecordService();
