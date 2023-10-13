import {vocabularyEndpoint} from '../configs';
import {IApiResponse, ICursorPaginationResponse} from '../interfaces/api/Http';
import {Vocabulary} from '../types/vocabulary';
import queryString from 'query-string';
import httpService from './http.service';
export type GetVocabulariesParams = {
  type?: string;
  limit?: number;
  cursor?: string;
  category?: string;
};
class VocabularyService {
  async getVocabularies({
    type,
    limit,
    cursor,
    category,
  }: GetVocabulariesParams): Promise<ICursorPaginationResponse<Vocabulary>> {
    const searchParams = queryString.stringify({
      type,
      limit,
      cursor,
      category,
    });
    console.log('searchParams', searchParams);

    const res = await httpService.get<
      IApiResponse<ICursorPaginationResponse<Vocabulary>>
    >(vocabularyEndpoint.base + '?' + searchParams);
    return res.data.data;
  }
}

export const vocabularyService = new VocabularyService();
