import { ICursorParams, IPaginationParams } from '../common'

export interface IGetVocabulariesDTO extends ICursorParams {
  category?: string
  type?: string
  recordStatus?: 'recorded' | 'not-recorded' | 'all'
}

export interface IGetVocabulariesPaginationDTO
  extends IPaginationParams {
  category?: string
  type?: string
  recordStatus?: 'recorded' | 'not-recorded' | 'all'
}
