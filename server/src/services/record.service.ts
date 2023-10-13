import { injectable } from 'tsyringe'
import RecordModel from '../entities/Record'
import { ICreateRecordDTO } from '../interfaces/dto/RecordDto'
import VocabularyService from './vocabulary.service'

@injectable()
export default class RecordService {
  constructor(readonly vocabularyService: VocabularyService) {}
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
}
