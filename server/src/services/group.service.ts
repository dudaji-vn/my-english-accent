import { injectable } from 'tsyringe'
import GroupModel from '../entities/Group'
import { ICreateGroupDTO } from '../interfaces/dto/GroupDTO'

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
}
