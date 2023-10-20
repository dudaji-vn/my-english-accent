import { injectable } from 'tsyringe'
import GroupModel from '../entities/Group'
import { ICreateGroupDTO } from '../interfaces/dto/GroupDTO'
import {
  IPaginationParams,
  IPaginationResponse
} from '../interfaces/common'

@injectable()
export default class GroupService {
  async createGroup(group: ICreateGroupDTO) {
    const { avatar, members, creator, name } = group
    await GroupModel.create({
      avatar,
      members,
      creator,
      name
    })
    return true
  }
  async getMyGroup(me: string) {
    const groups = await GroupModel.find({
      $or: [{ members: { $in: [me] } }, { creator: me }]
    }).populate('members')
    return groups
  }

  async searchMyGroups(
    { page = 1, pageSize = 10, q = '' }: IPaginationParams,
    me: string
  ): Promise<IPaginationResponse<any>> {
    const total = await GroupModel.countDocuments({
      $or: [{ members: { $in: [me] } }, { creator: me }],
      name: { $regex: q, $options: 'i' }
    })
    if (total === 0) {
      return {
        items: [],
        totalItems: total,
        currentPage: page,
        totalPage: 1,
        hasNextPage: false
      }
    }
    const groups = await GroupModel.find({
      $or: [{ members: { $in: [me] } }, { creator: me }],
      name: { $regex: q, $options: 'i' }
    })
      .populate('members creator')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
    return {
      items: groups,
      currentPage: page,
      totalItems: total,
      totalPage: Math.ceil(total / pageSize),
      hasNextPage: page * pageSize < total
    }
  }
}
