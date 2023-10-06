import httpService from './http.service';
import {authEndpoint} from '../configs';
import {IApiResponse} from '../interfaces/api/Http';
import {IUserLoginDTO, IUserRegisterDTO} from '../interfaces/api/Auth';

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
}

export const authService = new AuthService();
