import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import UserService from '../services/user.service'

@injectable()
export default class UserController {
  constructor(private readonly userService: UserService) {}
  async getAllUser(req: IRequest, res: IResponse) {
    const users = await this.userService.getAll()
    return res.success(users)
  }
  async updateUser(req: IRequest, res: IResponse) {
    const user = await this.userService.updateUser(
      req.body,
      req.user._id
    )
    return res.success(user)
  }
}
