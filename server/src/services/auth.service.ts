import bcrypt from 'bcrypt'
import { injectable } from 'tsyringe'
import UserModel from '../entities/User'
import {
  IUserRegisterDTO,
  IUserLoginDTO
} from '../interfaces/dto/UserDTO'
import JwtService from './jwt.service'
import { UnAuthorizeError } from '../interfaces/dto/Error'
@injectable()
export default class AuthService {
  constructor(private jwtService: JwtService) {}
  checkFieldsExist(
    user: IUserRegisterDTO,
    fields: string[]
  ): boolean {
    return fields.every((field) => user?.hasOwnProperty(field))
  }
  async login(userDto: IUserLoginDTO): Promise<string> {
    const { userId, email } = userDto

    if (!userId || !email) {
      throw new UnAuthorizeError('user is not register')
    }

    const user = await UserModel.findOne({
      email: email,
      userId: userId
    })

    if (!user) {
      throw new UnAuthorizeError('username not found')
    }

    const payload = { userId: user._id, email: email }
    const token = this.jwtService.generateAccessToken(payload)
    return token
  }
  async register(userDto: IUserRegisterDTO): Promise<string> {
    const { email } = userDto
    const requiredFields = [
      'userId',
      'avatar',
      'email',
      'displayName',
      'fullName',
      'nativeLanguage'
    ]
    if (!this.checkFieldsExist(userDto, requiredFields)) {
      throw new Error('Please input all fields')
    }

    const isExistUser = await UserModel.exists({ email: email })
    if (isExistUser) {
      throw new Error('email is existed')
    }

    const user = new UserModel({
      ...userDto
    })
    await user.save()
    const payload = { userId: user._id, email: email }
    const token = this.jwtService.generateAccessToken(payload)
    return token
  }
}
