import { Request } from 'express'
import { injectable } from 'tsyringe'
import { IResponse } from '../interfaces/common'
import { IGetVocabulariesDTO } from '../interfaces/dto/VocabularyDTO'
import VocabularyService from '../services/vocabulary.service'

@injectable()
export default class VocabularyController {
  constructor(
    private readonly vocabularyService: VocabularyService
  ) {}
  async getVocabularies(
    req: Request<{
      query: IGetVocabulariesDTO
    }>,
    res: IResponse
  ) {
    const { limit = 10, category, type, cursor } = req.query

    const vocabularies = await this.vocabularyService.getVocabularies(
      {
        limit: Number(limit),
        category: category?.toString(),
        type: type?.toString(),
        cursor: cursor?.toString()
      }
    )
    return res.success(vocabularies)
  }
}
