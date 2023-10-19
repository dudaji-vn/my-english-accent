import {listenEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {
  IGetAudioList,
  IListenDetailResponse,
  IParamListenDetail,
} from '../interfaces/api/Listen';
import {IUserProgress} from '../interfaces/api/User';
import httpService from './http.service';

class ListenService {
  async getUserProgress(): Promise<IUserProgress[]> {
    const res = await httpService.get<IApiResponse<IUserProgress[]>>(
      listenEndpoint.getUserProgress,
    );

    return res.data.data;
  }
  async getListenDetail(
    params: IParamListenDetail,
  ): Promise<IListenDetailResponse[]> {
    const res = await httpService.get<IApiResponse<IListenDetailResponse[]>>(
      listenEndpoint.getListenDetail,
      {
        params: params,
      },
    );
    return res.data.data;
  }

  async getAudioList(recordId: string) {
    const res = await httpService.get<IApiResponse<IGetAudioList>>(
      `${listenEndpoint.getAudioList}/${recordId}`,
    );

    return res.data.data;
  }
}

export const listenService = new ListenService();
