import {groupEndpoint} from '../configs';
import {IFormAddGroup, IGroups as IGroup} from '../interfaces/api/Group';
import {IApiResponse} from '../interfaces/api/Http';
import httpService from './http.service';

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
}

export const groupService = new GroupService();
