import { injectable } from 'tsyringe'
import UserModel from '../entities/User'
import {
  IAddOrRemoveFavoriteUser,
  IUserUpdateDTO
} from '../interfaces/dto/UserDTO'
import { BadRequestError } from '../interfaces/dto/Error'
import KeywordModel from '../entities/Keyword'
import { parse } from 'path/posix'
import { Mongoose } from 'mongoose'

@injectable()
export default class UserService {
  async getAll() {
    return await UserModel.find()
  }
  async updateUser(updateData: IUserUpdateDTO, userId: string) {
    return await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true
    })
  }

  async addKeyword(keyword: string, userId: string) {
    if (!keyword) {
      throw new BadRequestError('keyword is required')
    }
    await KeywordModel.create({
      text: keyword,
      user: userId
    })
    return true
  }
  async getKeywordByUser(user: string) {
    const result = await KeywordModel.where({ user: user })
    return result
  }
  async deleteKeyword(keywordId: string) {
    await KeywordModel.findByIdAndDelete(keywordId)
    return true
  }
  async addOrRemoveFavoriteUser(params: IAddOrRemoveFavoriteUser) {
    const user = await UserModel.findById(params.me)
    if (!user) {
      throw new BadRequestError('Error authenticate')
    }
    if (params.type === 'add') {
      user?.favoriteUsers.push(params.userId as any)
    } else {
      // @ts-ignore:next-line
      user?.favoriteUsers?.pull(params.userId as any)
    }
    await user.save()
    return {
      type: params.type,
      [params.type]: true
    }
  }
}
