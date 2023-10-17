// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import ListenController from '../../controllers/listen.controller'
import { catchAsync } from '../../middleware/catchAsync'
import auth from '../../middleware/auth'
const listenController =
  container.resolve<ListenController>(ListenController)

const listenRouter = express.Router()

listenRouter.get(
  '/getUserProgress',
  auth,
  catchAsync(listenController.getUserProgress.bind(listenController))
)

listenRouter.post(
  '/listenRecord',
  auth,
  catchAsync(listenController.listenRecord.bind(listenController))
)
export default listenRouter
