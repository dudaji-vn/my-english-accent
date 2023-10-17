import { injectable } from 'tsyringe'
import RecordModel from '../entities/Record'
import UserModel from '../entities/User'
import ListenModel from '../entities/Listen'
import { BadRequestError } from '../interfaces/dto/Error'
import mongoose from 'mongoose'

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
}
