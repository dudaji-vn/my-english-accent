import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import RecordService from '../services/record.service'
import { IGetRecordsPaginationDTO } from '../interfaces/dto/RecordDto'

@injectable()
export default class RecordController {
  constructor(private readonly recordService: RecordService) {}
  async createRecord(req: IRequest, res: IResponse) {
    const data = req.body
    const userId = req.user._id
    const record = await this.recordService.createRecord(data, userId)
    return res.success(record)
  }
  async getMyRecords(
    req: Request & {
      query: IGetRecordsPaginationDTO
      user: { _id: string }
    },
    res: IResponse
  ) {
    const userId = req.user._id
    const records = await this.recordService.getMyRecords(
      {
        ...req.query,
        page: Number(req.query.page || 1),
        pageSize: Number(req.query.pageSize || 10)
      },
      userId
    )
    return res.success(records)
  }
  async getRecordProgress(req: IRequest, res: IResponse) {
    const userId = req.user._id
    const records = await this.recordService.getRecordProgress(userId)
    return res.success(records)
  }

  async updateRecord(req: IRequest, res: IResponse) {
    const data = req.body
    const record = await this.recordService.updateRecord(
      data,
      req.params.recordId,
      req.user._id
    )
    return res.success(record)
  }
  async deleteRecord(req: IRequest, res: IResponse) {
    const { recordId } = req.params
    const userId = req.user._id
    const record = await this.recordService.deleteRecord(
      recordId,
      userId
    )
    return res.success(record)
  }
  async sendRecordToGroup(req: IRequest, res: IResponse) {
    const { recordId, groupId } = req.params
    const userId = req.user._id
    const record = await this.recordService.sendToGroup(
      recordId,
      groupId,
      userId
    )
    return res.success(record)
  }
  async sendAllRecordsToGroup(req: IRequest, res: IResponse) {
    const { groupId } = req.params
    console.log('😀', groupId)
    const userId = req.user._id
    const records = await this.recordService.sendAllToGroup(
      groupId,
      userId
    )
    return res.success(records)
  }
  async unsendRecordFromGroups(req: IRequest, res: IResponse) {
    const { recordId, groupId } = req.params
    console.log(recordId, groupId)
    const userId = req.user._id
    const record = await this.recordService.unsendFromGroup(
      recordId,
      groupId,
      userId
    )
    return res.success(record)
  }
}
