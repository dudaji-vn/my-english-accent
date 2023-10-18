import { IPaginationParams } from '../common'

export interface ICreateRecordDTO {
  recordUrl: {
    word?: string
    sentence?: string
  }
  vocabularyId: string
}

export interface IUpdateRecordDTO {
  recordUrl: {
    word?: string
    sentence?: string
  }
}

export interface IGetRecordsPaginationDTO extends IPaginationParams {
  category?: string
  type?: string
}
