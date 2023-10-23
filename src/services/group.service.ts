import queryString from 'query-string';
import {groupEndpoint} from '../configs';
import {IFormAddGroup, IGroups as IGroup} from '../interfaces/api/Group';
import {
  IApiResponse,
  IPaginationParams,
  IPaginationResponse,
} from '../interfaces/api/Http';
import httpService from './http.service';
import {Group} from '../types/group';

class GroupService {
  async createGroup(group: IFormAddGroup): Promise<boolean> {
    const res = await httpService.post<IApiResponse<boolean>>(
      groupEndpoint.createGroup,
      group,
    );
    return res.data.data;
  }

  async getMyGroup(): Promise<IGroup[]> {
    const res = await httpService.get<IApiResponse<IGroup[]>>(
      groupEndpoint.myGroups,
    );
    return res.data.data;
  }
  async searchMyGroups(
    params: IPaginationParams,
  ): Promise<IPaginationResponse<Group>> {
    const searchParams = queryString.stringify(params);
    const res = await httpService.get<IApiResponse<IPaginationResponse<Group>>>(
      groupEndpoint.base + '/search/me' + '?' + searchParams,
    );
    return res.data.data;
  }
}

export const groupService = new GroupService();
