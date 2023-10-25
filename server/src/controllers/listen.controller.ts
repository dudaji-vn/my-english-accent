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
    const data = await this.listenService.getUserProgress(
      req.user._id
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
    const { groupId } = req.query as unknown as IQueryListen

    const query: IQueryAudio = {
      recordId: recordId,
      userId: me,
      groupId: groupId
    }
    const data = await this.listenService.getAudioList(query)
    return res.success(data)
  }
}
