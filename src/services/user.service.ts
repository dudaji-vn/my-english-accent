import {userEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {Keyword, User} from '../types/user';
import httpService from './http.service';

class UserService {
  async updateUser(dataUpdate: Partial<User>): Promise<User> {
    const res = await httpService.patch<IApiResponse<User>>(
      userEndpoint.base,
      dataUpdate,
    );
    return res.data.data;
  }
  async getMyKeyword() {
    const res = await httpService.get<IApiResponse<Keyword[]>>(
      userEndpoint.myKeyword,
    );
    return res.data.data;
  }
  async addKeyword(keyword: string) {
    const res = await httpService.post<IApiResponse<boolean>>(
      userEndpoint.addKeyword,
      {
        keyword: keyword,
      },
    );
    return res.data.data;
  }
  async deleteKeyword(id: string) {
    const res = await httpService.post<IApiResponse<boolean>>(
      userEndpoint.deleteKeyword,
      {
        id: id,
      },
    );
    return res.data.data;
  }
}

export const userService = new UserService();
