// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import RecordController from '../../controllers/record.controller'
import { catchAsync } from '../../middleware/catchAsync'
import auth from '../../middleware/auth'
const recordController =
  container.resolve<RecordController>(RecordController)

const recordRouter = express.Router()

recordRouter.post(
  '/',
  auth,
  catchAsync(recordController.createRecord.bind(recordController))
)
recordRouter.get(
  '/me',
  auth,
  catchAsync(recordController.getMyRecords.bind(recordController))
)
recordRouter.get(
  '/progress',
  auth,
  catchAsync(
    recordController.getRecordProgress.bind(recordController)
  )
)

recordRouter.patch(
  '/:recordId',
  auth,
  catchAsync(recordController.updateRecord.bind(recordController))
)

recordRouter.delete(
  '/:recordId',
  auth,
  catchAsync(recordController.deleteRecord.bind(recordController))
)
recordRouter.post(
  '/send-all/:groupId',
  auth,
  catchAsync(
    recordController.sendAllRecordsToGroup.bind(recordController)
  )
)
recordRouter.post(
  '/:recordId/:groupId',
  auth,
  catchAsync(
    recordController.sendRecordToGroup.bind(recordController)
  )
)

recordRouter.delete(
  '/:recordId/:groupId',
  auth,
  catchAsync(
    recordController.unsendRecordFromGroups.bind(recordController)
  )
)

export default recordRouter
