import { ICursorParams } from '../common'

export interface IGetVocabulariesDTO extends ICursorParams {
  category?: string
  type?: string
}
