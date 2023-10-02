import bcrypt from 'bcrypt'
import { injectable } from 'tsyringe'
import UserModel from '../entities/User'
import {
  IUserRegisterRequestDTO,
  IUserRequestDTO
} from '../interfaces/dto/UserDTO'
import JwtService from './jwt.service'
@injectable()
export default class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(userDto: IUserRequestDTO): Promise<string> {
    const { username, password } = userDto

    if (!username || !password) {
      throw new Error('username or password not found')
    }

    const user = await UserModel.findOne({
      username: username
    })

    if (!user) {
      throw new Error('username not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('username or password not correct')
    }

    const payload = { userId: user._id, username: username }
    const token = this.jwtService.generateAccessToken(payload)
    return token
  }
  async register(userDto: IUserRegisterRequestDTO): Promise<string> {
    const { username, password, confirmPassword } = userDto
    if (!username || !password || !confirmPassword) {
      throw new Error('Please input all fields')
    }
    if (password !== confirmPassword) {
      throw new Error('Confirm password not match with password')
    }
    const isExistUser = await UserModel.exists({ username: username })
    if (isExistUser) {
      throw new Error('username is existed')
    }
    const passwordHash = await bcrypt.hash(password, 12)
    const user = new UserModel({
      username: username,
      password: passwordHash
    })
    await user.save()
    const payload = { userId: user._id, username: username }
    const token = this.jwtService.generateAccessToken(payload)
    return token
  }
}
