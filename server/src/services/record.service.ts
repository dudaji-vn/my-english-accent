import { delay, inject, injectable } from 'tsyringe'
import RecordModel from '../entities/Record'
import {
  ICreateRecordDTO,
  IGetRecordsPaginationDTO,
  IUpdateRecordDTO
} from '../interfaces/dto/RecordDto'
import VocabularyService from './vocabulary.service'
import GroupModel from '../entities/Group'
import GroupRecordModel from '../entities/GroupRecord'

@injectable()
export default class RecordService {
  constructor(
    @inject(delay(() => VocabularyService))
    readonly vocabularyService: VocabularyService
  ) {}
  async getMyRecords(
    {
      page = 1,
      pageSize = 10,
      category,
      type,
      q
    }: IGetRecordsPaginationDTO,
    userId: String
  ): Promise<any> {
    const total = await RecordModel.aggregate([
      {
        $lookup: {
          from: 'vocabularies',
          localField: 'vocabulary',
          foreignField: '_id',
          as: 'vocabulary'
        }
      },
      {
        $match: {
          user: userId,
          ...(category && { 'vocabulary.category': category }),
          ...(type && { 'vocabulary.type': type }),
          ...(q && {
            $or: [
              {
                'vocabulary.text.en': { $regex: q, $options: 'i' }
              },
              {
                'vocabulary.example.en': {
                  $regex: q,
                  $options: 'i'
                }
              }
            ]
          })
        }
      },
      {
        $count: 'total'
      }
    ])
    if (!total[0]?.total) {
      return {
        items: [],
        currentPage: page,
        totalPage: 1,
        totalItems: 0,
        hasNextPage: false
      }
    }
    const records = await RecordModel.aggregate([
      {
        $lookup: {
          from: 'vocabularies',
          localField: 'vocabulary',
          foreignField: '_id',
          as: 'vocabulary'
        }
      },
      {
        $match: {
          user: userId,
          ...(category && { 'vocabulary.category': category }),
          ...(type && { 'vocabulary.type': type }),
          ...(q && {
            $or: [
              {
                'vocabulary.text.en': { $regex: q, $options: 'i' }
              },
              {
                'vocabulary.example.en': {
                  $regex: q,
                  $options: 'i'
                }
              }
            ]
          })
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $skip: (page - 1) * pageSize
      },
      ...(pageSize !== 0 ? [{ $limit: pageSize }] : []),
      {
        $project: {
          _id: 1,
          recordUrl: 1,
          vocabulary: {
            $arrayElemAt: ['$vocabulary', 0]
          }
        }
      }
    ] as any)

    return {
      items: records,
      currentPage: page,
      totalPage:
        pageSize === 0
          ? 1
          : Math.ceil(total[0]?.total / pageSize) || 1,
      totalItems: total[0].total,
      hasNextPage:
        pageSize === 0 ? false : page * pageSize < total[0]?.total
    }
  }
  async createRecord(
    { recordUrl, vocabularyId }: ICreateRecordDTO,
    userId: String
  ): Promise<any> {
    const record = await RecordModel.create({
      recordUrl,
      vocabulary: vocabularyId,
      user: userId
    })
    return record
  }
  async updateRecord(
    { recordUrl }: IUpdateRecordDTO,
    recordId: String,
    userId: String
  ): Promise<any> {
    if (!recordUrl?.word && !recordUrl?.sentence) {
      await this.deleteRecord(recordId, userId)
      return
    }
    const record = await RecordModel.findByIdAndUpdate(
      recordId,
      {
        recordUrl
      },
      { new: true }
    ).populate('vocabulary')
    return record
  }

  async deleteRecord(recordId: String, userId: String): Promise<any> {
    const record = await RecordModel.findOneAndDelete({
      _id: recordId,
      user: userId
    })
    if (!record) {
      throw new Error('Record not found')
    }
    return record
  }

  async getRecordProgress(userId: String): Promise<any> {
    const recordCountByCategory = await RecordModel.aggregate([
      {
        $match: {
          user: userId
        }
      },
      {
        $lookup: {
          from: 'vocabularies',
          localField: 'vocabulary',
          foreignField: '_id',
          as: 'vocabulary'
        }
      },
      {
        $group: {
          _id: { $first: '$vocabulary.category' },
          count: { $sum: 1 }
        }
      }
    ])

    const vocabularyCountByCategory =
      await this.vocabularyService.getNumberOfVocabulariesByCategory()

    return {
      recordProgress: recordCountByCategory,
      vocabularyCountByCategory
    }
  }
  async getVocabularyRecorded(userId: String): Promise<any> {
    const recorded = await RecordModel.find({
      user: userId
    })
    return recorded.map((record) => record.vocabulary)
  }

  async sendToGroup(
    recordId: String,
    groupId: String,
    userId: string
  ): Promise<any> {
    const record = await RecordModel.findOne({
      _id: recordId,
      user: userId
    })
    if (!record) {
      throw new Error('Record not found')
    }
    const group = await GroupModel.findOne({
      _id: groupId,
      $or: [{ members: { $in: [userId] } }, { creator: userId }]
    })
    if (!group) {
      throw new Error('Group not found')
    }
    const newGroupRecord = await GroupRecordModel.create({
      group: groupId,
      record: recordId
    })
    return newGroupRecord
  }

  async unsendFromGroup(
    recordId: String,
    groupId: String,
    userId: string
  ) {
    const record = await RecordModel.findOne({
      _id: recordId,
      user: userId
    })
    if (!record) {
      throw new Error('Record not found')
    }
    const group = await GroupModel.findOne({
      _id: groupId,
      $or: [{ members: { $in: [userId] } }, { creator: userId }]
    })

    if (!group) {
      throw new Error('Group not found')
    }

    const deletedGroupRecord =
      await GroupRecordModel.findOneAndDelete({
        group: groupId,
        record: recordId
      })
    return deletedGroupRecord
  }
}
