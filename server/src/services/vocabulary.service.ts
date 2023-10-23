import { delay, inject, injectable } from 'tsyringe'
import VocabularyModel from '../entities/Vocabulary'
import {
  IGetVocabulariesDTO,
  IGetVocabulariesPaginationDTO
} from '../interfaces/dto/VocabularyDTO'
import {
  ICursorResponse,
  IPaginationResponse
} from '../interfaces/common'
import RecordService from './record.service'
import { ObjectId } from 'mongoose'

@injectable()
export default class VocabularyService {
  constructor(
    @inject(delay(() => RecordService))
    readonly recordService: RecordService
  ) {}
  async getVocabularies(
    {
      limit = 10,
      category,
      type,
      recordStatus = 'all'
    }: IGetVocabulariesDTO,
    userId: string
  ): Promise<ICursorResponse<any>> {
    let idCondition = {
      $nin: [],
      $eq: []
    } as any
    switch (recordStatus) {
      case 'all':
        idCondition = null
        break
      case 'recorded':
        idCondition.$eq =
          await this.recordService.getVocabularyRecorded(userId)
        delete idCondition.$nin
        break
      case 'not-recorded':
        idCondition.$nin =
          await this.recordService.getVocabularyRecorded(userId)
        delete idCondition.$eq
        break
    }
    const vocabularies = await VocabularyModel.find({
      ...(category && { category }),
      ...(type && { type }),
      ...(idCondition && { _id: idCondition })
    })
      .limit(limit)
      .lean()
    return {
      items: vocabularies,
      endCursor:
        vocabularies[vocabularies.length - 1]?._id.toString(),
      hasNextPage: vocabularies.length === limit
    }
  }
  async getVocabulariesPagination(
    {
      page = 1,
      pageSize = 10,
      category,
      type,
      recordStatus = 'all'
    }: IGetVocabulariesPaginationDTO,
    userId: string
  ): Promise<IPaginationResponse<any>> {
    let idCondition = {
      $nin: [],
      $in: []
    } as any
    const recorded = await this.recordService.getVocabularyRecorded(
      userId
    )
    switch (recordStatus) {
      case 'all':
        idCondition = null
        break
      case 'recorded':
        idCondition.$in = recorded
        delete idCondition.$nin
        break
      case 'not-recorded':
        idCondition.$nin = recorded
        delete idCondition.$in
        break
    }
    const vocabularies = await VocabularyModel.find({
      ...(category && { category }),
      ...(type && { type }),
      ...(idCondition && { _id: idCondition })
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
    const total = await VocabularyModel.countDocuments({
      ...(category && { category }),
      ...(type && { type }),
      ...(idCondition && { _id: idCondition })
    })
    const vocabulariesWithRecordStatus = vocabularies.map(
      (vocabulary) => ({
        ...vocabulary,
        isRecorded: recorded.some(
          (record: ObjectId) =>
            record.toString() === vocabulary._id.toString()
        )
      })
    )

    return {
      items: vocabulariesWithRecordStatus.sort(
        (a, b) => a.isRecorded - b.isRecorded
      ),
      currentPage: page,
      totalPage: pageSize === 0 ? 1 : Math.ceil(total / pageSize),
      totalItems: total,
      hasNextPage: pageSize === 0 ? false : page * pageSize < total
    }
  }
  async getNumberOfVocabulariesByCategory(): Promise<any> {
    const vocabularies = await VocabularyModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ])
    return vocabularies
  }
  async getNotRecordedVocabularies(UserId: string): Promise<any> {
    const recorded = await this.recordService.getVocabularyRecorded(
      UserId
    )
    const vocabularies = await VocabularyModel.find({
      _id: { $nin: recorded }
    }).lean()
    return vocabularies
  }
}
