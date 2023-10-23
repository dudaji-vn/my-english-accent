// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import GroupController from '../../controllers/group.controller'
import { catchAsync } from '../../middleware/catchAsync'
import auth from '../../middleware/auth'
const groupController =
  container.resolve<GroupController>(GroupController)

const groupRouter = express.Router()

groupRouter.get(
  '/myGroups',
  auth,
  catchAsync(groupController.getMyGroup.bind(groupController))
)
groupRouter.post(
  '/createGroup',
  auth,
  catchAsync(groupController.createGroup.bind(groupController))
)

groupRouter.get(
  '/search/me',
  auth,
  catchAsync(groupController.searchMyGroups.bind(groupController))
)

export default groupRouter
