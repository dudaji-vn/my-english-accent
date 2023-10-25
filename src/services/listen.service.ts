import {listenEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {
  IGetAudioList,
  IListenDetailResponse,
  IParamAudio,
  IParamListenDetail,
} from '../interfaces/api/Listen';
import {IUserProgress} from '../interfaces/api/User';
import httpService from './http.service';

class ListenService {
  async listenRecord(recordId: string): Promise<boolean> {
    const res = await httpService.post<IApiResponse<boolean>>(
      listenEndpoint.listenRecord,
      {
        recordId: recordId,
      },
    );
    return res.data.data;
  }
  async getUserProgress(): Promise<IUserProgress[]> {
    const res = await httpService.get<IApiResponse<IUserProgress[]>>(
      listenEndpoint.getUserProgress,
    );

    return res.data.data;
  }
  async getListenDetail(
    params: IParamListenDetail,
  ): Promise<IListenDetailResponse> {
    console.log('call');
    console.log(params);
    const res = await httpService.get<IApiResponse<IListenDetailResponse>>(
      params.groupId
        ? listenEndpoint.getListenDetailInGroup
        : listenEndpoint.getListenDetail,
      {
        params: {...params},
      },
    );
    return res.data.data;
  }

  async getAudioList(paramAudio: IParamAudio) {
    const res = await httpService.get<IApiResponse<IGetAudioList>>(
      `${listenEndpoint.getAudioList}/${paramAudio.recordId}`,
      {
        params: {
          groupId: paramAudio.groupId,
          userId: paramAudio.userId,
        },
      },
    );

    return res.data.data;
  }
}

export const listenService = new ListenService();
