import {userEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {User} from '../types/user';
import httpService from './http.service';

class UserService {
  async updateUser(dataUpdate: Partial<User>): Promise<User> {
    const res = await httpService.patch<IApiResponse<User>>(
      userEndpoint.base,
      dataUpdate,
    );
    return res.data.data;
  }
}

export const userService = new UserService();
