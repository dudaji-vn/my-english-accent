import {authEndpoint} from '../configs';
import {IUserLoginDTO, IUserRegisterDTO} from '../interfaces/api/Auth';
import {IApiResponse} from '../interfaces/api/Http';
import {User} from '../types/user';
import httpService from './http.service';

class AuthService {
  async login(user: IUserLoginDTO): Promise<string> {
    const res = await httpService.post<IApiResponse<string>>(
      authEndpoint.login,
      user,
    );
    return res.data.data;
  }
  async register(user: IUserRegisterDTO): Promise<string> {
    const res = await httpService.post<IApiResponse<string>>(
      authEndpoint.register,
      user,
    );
    return res.data.data;
  }
  async getProfile(): Promise<User> {
    const res = await httpService.get<IApiResponse<User>>(authEndpoint.profile);
    console.log('🙂', res.data.data);
    return res.data.data;
  }
}

export const authService = new AuthService();
