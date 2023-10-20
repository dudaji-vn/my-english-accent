import { injectable } from 'tsyringe'
import RecordModel from '../entities/Record'
import UserModel from '../entities/User'
import ListenModel from '../entities/Listen'
import { BadRequestError } from '../interfaces/dto/Error'
import mongoose from 'mongoose'
import {
  IQueryAudio,
  IQueryListen
} from '../interfaces/dto/ListenDTO'

@injectable()
export default class ListenService {
  async getUserProgress(me: string) {
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
          nativeLanguage: 1
        }
      }
    ]).then((data) => {
      const myUser = data.find(
        (user) => user._id.toString() == me.toString()
      )
      const myRecord = myUser.listens.map((item: any) =>
        item.record.toString()
      )

      const result = data.map((user) => {
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
      return result.filter(
        (item: any) => item._id.toString() !== me.toString()
      )
    })
    return data
  }

  async listenRecord(me: string, recordId: string) {
    if (!recordId) {
      throw new BadRequestError('recordId is required')
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
    console.log(category)
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
                  { $eq: [{ $size: '$listenData' }, 1] },
                  {
                    $eq: [
                      { $arrayElemAt: ['$listenData.user', 0] },
                      new mongoose.Types.ObjectId(me)
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
          vocabulary: {
            text: '$vocabularyData.text',
            _id: '$vocabularyData._id',
            type: '$vocabularyData.type'
          }
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
    return data
  }

  async getAudioList(query: IQueryAudio) {
    const currentRecord = await RecordModel.findById(
      query.recordId
    ).populate('vocabulary user')
    const nextRecord = await RecordModel.find({
      _id: { $ne: query.recordId },
      user: currentRecord?.user
    }).populate('vocabulary user')

    return {
      currentRecord,
      nextRecord
    }
  }
}
