import { Request } from 'express'
import { injectable } from 'tsyringe'
import { IResponse } from '../interfaces/common'
import {
  IGetVocabulariesDTO,
  IGetVocabulariesPaginationDTO
} from '../interfaces/dto/VocabularyDTO'
import VocabularyService from '../services/vocabulary.service'

@injectable()
export default class VocabularyController {
  constructor(
    private readonly vocabularyService: VocabularyService
  ) {}
  async getVocabularies(
    req: Request & {
      query: IGetVocabulariesDTO
      user: { _id: string }
    },
    res: IResponse
  ) {
    const {
      limit = 10,
      category,
      type,
      cursor,
      recordStatus
    } = req.query

    const vocabularies = await this.vocabularyService.getVocabularies(
      {
        limit: Number(limit),
        category: category?.toString(),
        type: type?.toString(),
        cursor: cursor?.toString(),
        recordStatus
      },
      req.user._id
    )
    return res.success(vocabularies)
  }
  async getVocabulariesOffset(
    req: Request & {
      query: IGetVocabulariesPaginationDTO
      user: { _id: string }
    },
    res: IResponse
  ) {
    const vocabularies =
      await this.vocabularyService.getVocabulariesPagination(
        {
          ...req.query,
          page: Number(req.query.page || 1),
          pageSize: Number(req.query.pageSize || 10)
        },
        req.user._id
      )
    return res.success(vocabularies)
  }
}
