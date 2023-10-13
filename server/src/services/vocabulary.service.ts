import { injectable } from 'tsyringe'
import VocabularyModel from '../entities/Vocabulary'
import { IGetVocabulariesDTO } from '../interfaces/dto/VocabularyDTO'
import { ICursorResponse } from '../interfaces/common'

@injectable()
export default class VocabularyService {
  async getVocabularies({
    limit = 10,
    cursor,
    category,
    type
  }: IGetVocabulariesDTO): Promise<ICursorResponse<any>> {
    const vocabularies = await VocabularyModel.find({
      ...(category && { category }),
      ...(type && { type }),
      ...(cursor && { _id: { $gt: cursor } })
    })
      .limit(limit)
      // .sort({
      //   'text.en': 1
      // })
      .lean()
    return {
      items: vocabularies,
      endCursor:
        vocabularies[vocabularies.length - 1]?._id.toString(),
      hasNextPage: vocabularies.length === limit
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
}
