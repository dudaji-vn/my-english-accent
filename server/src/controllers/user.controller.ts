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
  async addKeyword(req: IRequest, res: IResponse) {
    const { keyword } = req.body
    const result = await this.userService.addKeyword(
      keyword,
      req.user._id
    )
    return res.success(result)
  }

  async getKeywordByUser(req: IRequest, res: IResponse) {
    const result = await this.userService.getKeywordByUser(
      req.user._id
    )
    return res.success(result)
  }
  async addOrRemoveFavoriteUser(req: IRequest, res: IResponse) {
    const { userId, type } = req.body
    const result = await this.userService.addOrRemoveFavoriteUser({
      me: req.user._id,
      type: type,
      userId: userId
    })
    return res.success(result)
  }
  async deleteKeyword(req: IRequest, res: IResponse) {
    const { id } = req.body
    const result = await this.userService.deleteKeyword(id)
    return res.success(result)
  }
}
