import {vocabularyEndpoint} from '../configs';
import {IApiResponse, IPaginationResponse} from '../interfaces/api/Http';
import {GetVocabulariesParams, Vocabulary} from '../types/vocabulary';
import queryString from 'query-string';
import httpService from './http.service';

class VocabularyService {
  async getVocabularies(
    params: GetVocabulariesParams,
  ): Promise<IPaginationResponse<Vocabulary>> {
    const searchParams = queryString.stringify(params);
    const res = await httpService.get<
      IApiResponse<IPaginationResponse<Vocabulary>>
    >(vocabularyEndpoint.base + '?' + searchParams);
    return res.data.data;
  }
}

export const vocabularyService = new VocabularyService();
