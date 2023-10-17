import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import ListenService from '../services/listen.service'

@injectable()
export default class ListenController {
  constructor(private readonly listenService: ListenService) {}
  async listenRecord(req: IRequest, res: IResponse) {
    const { recordId } = req.body
    const me = req.user._id
    const data = await this.listenService.listenRecord(me, recordId)
    return res.success(data)
  }
  async getUserProgress(req: IRequest, res: IResponse) {
    const data = await this.listenService.getUserProgress(
      req.user._id
    )

    return res.success(data)
  }
}
