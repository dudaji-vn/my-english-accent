import {listenEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {IUserProgress} from '../interfaces/api/User';
import httpService from './http.service';

class ListenService {
  async getUserProgress(): Promise<IUserProgress[]> {
    const res = await httpService.get<IApiResponse<IUserProgress[]>>(
      listenEndpoint.getUserProgress,
    );

    return res.data.data;
  }
}

export const listenService = new ListenService();
