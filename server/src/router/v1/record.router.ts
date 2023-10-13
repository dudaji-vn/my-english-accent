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
  '/progress',
  auth,
  catchAsync(
    recordController.getRecordProgress.bind(recordController)
  )
)

export default recordRouter
