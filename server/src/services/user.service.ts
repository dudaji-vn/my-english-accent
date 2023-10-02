import { injectable } from 'tsyringe'
import UserModel from '../entities/User'

@injectable()
export default class UserService {
  async getAll() {
    return await UserModel.find()
  }
}
