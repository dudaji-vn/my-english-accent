import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import RecordService from '../services/record.service'

@injectable()
export default class RecordController {
  constructor(private readonly recordService: RecordService) {}
  async createRecord(req: IRequest, res: IResponse) {
    const data = req.body
    const userId = req.user._id
    const record = await this.recordService.createRecord(data, userId)
    return res.success(record)
  }
  async getRecordProgress(req: IRequest, res: IResponse) {
    const userId = req.user._id
    const records = await this.recordService.getRecordProgress(userId)
    return res.success(records)
  }
}
