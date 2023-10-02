import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import {
  IUserRegisterRequestDTO,
  IUserRequestDTO
} from '../interfaces/dto/UserDTO'
import AuthService from '../services/auth.service'

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}
  async login(req: IRequest, res: IResponse) {
    const userRequestDto = req.body as IUserRequestDTO
    const login = await this.authService.login(userRequestDto)
    return res.success(login)
  }
  async register(req: IRequest, res: IResponse) {
    const userRequestDto = req.body as IUserRegisterRequestDTO
    const dataRes = await this.authService.register(userRequestDto)
    return res.success(dataRes)
  }
}

export default AuthController
