import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import ListenService from '../services/listen.service'
import {
  IQueryAudio,
  IQueryListen
} from '../interfaces/dto/ListenDTO'

@injectable()
export default class ListenController {
  constructor(private readonly listenService: ListenService) {}
  async listenRecord(req: IRequest, res: IResponse) {
    const { recordId, groupId } = req.body
    const me = req.user._id
    let data = null
    if (groupId) {
      data = await this.listenService.listenRecordInGroup(
        me,
        recordId,
        groupId
      )
    } else {
      data = await this.listenService.listenRecord(me, recordId)
    }

    return res.success(data)
  }

  async getUserProgress(req: IRequest, res: IResponse) {
    const { isFavoriteUsers } = req.query as any
    const data = await this.listenService.getUserProgress(
      req.user,
      isFavoriteUsers
    )
    return res.success(data)
  }

  async getListenDetail(req: IRequest, res: IResponse) {
    const query = req.query as unknown as IQueryListen
    const me = req.user._id
    const data = await this.listenService.getListenDetail(query, me)
    return res.success(data)
  }

  async getListenDetailInGroup(req: IRequest, res: IResponse) {
    const query = req.query as unknown as IQueryListen
    const me = req.user._id
    const data = await this.listenService.getListenDetailInGroup(
      query,
      me
    )
    return res.success(data)
  }

  async getAudioList(req: IRequest, res: IResponse) {
    const me = req.user._id
    const { recordId } = req.params
    const { groupId, userId } = req.query as unknown as IQueryListen

    const query: IQueryAudio = {
      recordId: recordId,
      userId: userId,
      groupId: groupId,
      me: me
    }
    const data = await this.listenService.getAudioList(query)
    return res.success(data)
  }
  async getUserAudioInGroup(req: IRequest, res: IResponse) {
    const me = req.user._id
    const { recordId } = req.params
    const { groupId, userId, vocabularyId } =
      req.query as unknown as IQueryAudio
    const query: IQueryAudio = {
      recordId: recordId,
      userId: userId,
      groupId: groupId,
      me: me,
      vocabularyId: vocabularyId
    }
    const data = await this.listenService.getUserAudioInGroup(query)
    return res.success(data)
  }
}
