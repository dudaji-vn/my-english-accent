import { injectable } from 'tsyringe'
import {
  IPaginationParams,
  IRequest,
  IResponse
} from '../interfaces/common'
import GroupService from '../services/group.service'
import { ICreateGroupDTO } from '../interfaces/dto/GroupDTO'

@injectable()
export default class GroupController {
  constructor(private readonly groupService: GroupService) {}
  async createGroup(req: IRequest, res: IResponse) {
    const groupRequestDto = req.body as ICreateGroupDTO
    groupRequestDto.creator = req.user
    const data = await this.groupService.createGroup(groupRequestDto)
    return res.success(data)
  }
  async getMyGroup(req: IRequest, res: IResponse) {
    const me = req.user._id
    const groups = await this.groupService.getMyGroup(me)
    return res.success(groups)
  }

  async searchMyGroups(
    req: Request & {
      query: IPaginationParams
      user: {
        _id: string
      }
    },
    res: IResponse
  ) {
    const me = req.user._id
    const { page, pageSize, q } = req.query
    const data = await this.groupService.searchMyGroups(
      { page, pageSize, q },
      me
    )
    return res.success(data)
  }
}
