//@ts-nocheck
import { injectable } from 'tsyringe'
import RecordModel from '../entities/Record'
import UserModel from '../entities/User'
import ListenModel from '../entities/Listen'
import { BadRequestError } from '../interfaces/dto/Error'
import mongoose, { Mongoose } from 'mongoose'
import {
  IQueryAudio,
  IQueryListen
} from '../interfaces/dto/ListenDTO'
import GroupRecordModel from '../entities/GroupRecord'
import GroupModel from '../entities/Group'
import { Category, ROLE } from '../const/common'

@injectable()
export default class ListenService {
  async getUserProgress(user: any, isFavoriteUsers: boolean) {
    const { _id: me, favoriteUsers } = user
    const data = await UserModel.aggregate([
      {
        $lookup: {
          from: 'listens',
          localField: '_id',
          foreignField: 'user',
          as: 'listens',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$user', new mongoose.Types.ObjectId(me)]
                }
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'records',
          localField: '_id',
          foreignField: 'user',
          as: 'records'
        }
      },
      {
        $addFields: {
          totalListen: { $size: '$listens' },
          totalRecord: { $size: '$records' }
        }
      },
      {
        $project: {
          email: 1,
          displayName: 1,
          role: 1,
          avatar: 1,
          listens: 1,
          records: 1,
          totalRecord: 1,
          nativeLanguage: 1,
          fullName: 1
        }
      }
    ]).then((data) => {
      const myUser = data.find(
        (user) => user._id.toString() == me.toString()
      )
      const myRecord = myUser.listens.map((item: any) =>
        item.record.toString()
      )

      let result = data.map((user) => {
        let count = 0
        user.records.forEach((x: any) => {
          if (myRecord.includes(x._id.toString())) {
            count++
          }
        })
        return {
          totalListen: count,
          ...user
        }
      })
      if (isFavoriteUsers) {
        result = result.filter((item: any) =>
          favoriteUsers.includes(item._id.toString())
        )
      }
      return result.filter(
        (item: any) => item._id.toString() !== me.toString()
      )
    })
    return data
  }

  async listenRecordInGroup(
    me: string,
    recordId: string,
    groupId: string
  ) {
    if (!recordId) {
      throw new BadRequestError('recordId is required')
    }
    if (!groupId) {
      throw new BadRequestError('groupId is required')
    }
    const isExist = await ListenModel.exists({
      user: me,
      record: recordId,
      group: groupId
    })
    if (isExist) {
      throw new BadRequestError('user listened record in group')
    }
    const listen = new ListenModel({
      user: me,
      record: recordId,
      group: groupId
    })
    await listen.save()
    return true
  }
  async listenRecord(me: string, recordId: string) {
    if (!recordId) {
      throw new BadRequestError('recordId is required')
    }
    const isExist = await ListenModel.exists({
      user: me,
      record: recordId
    })
    if (isExist) {
      throw new BadRequestError('user listened record')
    }
    const listen = new ListenModel({
      user: me,
      record: recordId
    })
    await listen.save()
    return true
  }

  async getListenDetail(query: IQueryListen, me: string) {
    const userId = query.userId
    const { category, sortBy, type } = query
    if (!userId) {
      throw new BadRequestError('userId is required')
    }
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new BadRequestError('user not found')
    }

    const data = await RecordModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'vocabularies',
          localField: 'vocabulary',
          foreignField: '_id',
          as: 'vocabularyData'
        }
      },

      {
        $match: {
          // 'vocabularyData.category': category || 'general',
          ...(type && { 'vocabularyData.type': type })
        }
      },
      {
        $unwind: {
          path: '$vocabularyData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'listens',
          localField: '_id',
          foreignField: 'record',
          as: 'listenData'
        }
      },

      {
        $project: {
          _id: 1,
          recordUrl: 1,
          createdAt: 1,
          category: '$vocabularyData.category',
          isListen: {
            $cond: {
              if: {
                $and: [
                  {
                    $in: [
                      new mongoose.Types.ObjectId(me),
                      '$listenData.user'
                    ]
                  }
                ]
              },
              then: true,
              else: false
            }
          },
          dateListenAt: {
            $arrayElemAt: ['$listenData.createdAt', 0]
          },
          vocabulary: '$vocabularyData'
        }
      },
      {
        $sort:
          sortBy === 'latestFile'
            ? { createdAt: -1 }
            : sortBy === 'completedRecently'
            ? { dateListenAt: -1 }
            : { createdAt: 1 }
      },
      {
        $group: {
          _id: {
            category: '$category'
          },
          totalRecord: { $sum: 1 },
          records: {
            $push: {
              _id: '$_id',
              recordUrl: '$recordUrl',
              vocabulary: '$vocabulary',
              isListen: '$isListen',
              createdAt: '$createdAt',
              dateListenAt: '$dateListenAt'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id.category',
          user: '$_id.user',
          totalRecord: 1,
          records: 1
        }
      }
    ])
    if (!data.find((item) => item.category === 'general')) {
      data.push({ category: 'general', records: [], totalRecord: 0 })
    }
    if (data.find((item) => item.category === user.role)) {
      return {
        user: {},
        recordInfo: data
      }
    }
    let item = {}
    switch (user.role) {
      case ROLE.designer:
        item = {
          category: ROLE.designer,
          records: [],
          totalRecord: 0
        }
      case ROLE.developer:
        item = {
          category: ROLE.developer,
          records: [],
          totalRecord: 0
        }

      default:
        item = { category: 'developer', records: [], totalRecord: 0 }
    }
    data.push(item)
    return {
      user: {},
      recordInfo: data
    }
  }
  async getListenDetailInGroup(query: IQueryListen, me: string) {
    let group = await GroupModel.findById(query.groupId)
      .populate('members creator')
      .lean()
    if (!group) {
      throw new BadRequestError('group not found')
    }
    const recordInfo = await GroupRecordModel.aggregate([
      {
        $match: {
          group: new mongoose.Types.ObjectId(query.groupId)
        }
      },
      {
        $lookup: {
          from: 'records',
          localField: 'record',
          foreignField: '_id',
          as: 'recordData'
        }
      },
      {
        $unwind: {
          path: '$recordData'
        }
      },
      {
        $lookup: {
          from: 'vocabularies',
          localField: 'recordData.vocabulary',
          foreignField: '_id',
          as: 'vocabularyData'
        }
      },
      {
        $unwind: {
          path: '$vocabularyData'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'recordData.user',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $unwind: {
          path: '$userData'
        }
      },
      {
        $match: {
          ...(query.type && { 'vocabularyData.type': query.type })
        }
      },
      {
        $lookup: {
          from: 'listens',
          localField: 'group',
          foreignField: 'group',
          as: 'listenData'
        }
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          listenData: 1,
          recordData: 1,
          userData: 1,
          category: '$vocabularyData.category',
          isListen: {
            $cond: {
              if: {
                $and: [
                  {
                    $in: ['$recordData._id', '$listenData.record']
                  },
                  {
                    $in: [
                      new mongoose.Types.ObjectId(
                        '6523652ba75917a85dfeac5b'
                      ),
                      '$listenData.user'
                    ]
                  }
                ]
              },
              then: true,
              else: false
            }
          },

          vocabulary: '$vocabularyData'
        }
      },
      {
        $group: {
          _id: {
            category: '$category'
          },
          totalRecord: { $sum: 1 },
          records: {
            $push: {
              _id: '$recordData._id',
              user: '$userData',
              vocabulary: '$vocabulary',
              isListen: '$isListen',
              recordUrl: '$recordData.recordUrl'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id.category',
          user: '$_id.user',
          totalRecord: 1,
          records: 1
        }
      }
    ])
    Object.values(Category).forEach((category) => {
      if (!recordInfo.find((item) => item.category === category)) {
        recordInfo.push({
          category: category,
          records: [],
          totalRecord: 0
        })
      }
    })

    return {
      group,
      recordInfo
    }
  }

  async getUserAudioInGroup(query: IQueryAudio) {
    const records = await GroupRecordModel.find({
      group: query.groupId
    }).populate({
      path: 'record',
      populate: 'vocabulary user'
    })
    console.log({ records, vocaId: query.vocabularyId })
    return records
      .filter(
        (item) =>
          item.record.vocabulary._id.toString() == query.vocabularyId
      )
      .map((item) => item?.record?.user)
  }
  async getAudioList(query: IQueryAudio) {
    let currentRecord: any

    let nextRecord: any = []
    if (query.groupId) {
      currentRecord = await GroupRecordModel.findOne({
        record: query.recordId,
        group: query.groupId
      })
        .populate({
          path: 'record',
          populate: 'vocabulary user'
        })
        .select('record')

      if (query.userId) {
        currentRecord = await RecordModel.findOne({
          user: query.userId,
          vocabulary: currentRecord.record.vocabulary
        })
        currentRecord = await GroupRecordModel.findOne({
          record: currentRecord._id
        })
          .populate({
            path: 'record',
            populate: 'vocabulary user'
          })
          .select('record')
      }
      currentRecord = currentRecord?.record

      const nextRecordData = await GroupRecordModel.find({
        record: { $ne: query.recordId },
        group: query.groupId
      })
        .populate({
          path: 'record',
          populate: 'vocabulary user'
        })
        .select('record')
      nextRecord = nextRecordData.map((item: any) => item.record)
    } else {
      currentRecord = await RecordModel.findById(
        query.recordId
      ).populate('vocabulary user')
      nextRecord = await RecordModel.find({
        _id: { $ne: query.recordId },
        user: currentRecord?.user
      }).populate('vocabulary user')
    }

    return {
      currentRecord,
      nextRecord: nextRecord
    }
  }
}
