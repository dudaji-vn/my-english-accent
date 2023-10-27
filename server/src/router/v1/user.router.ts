// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import auth from '../../middleware/auth'
import { catchAsync } from '../../middleware/catchAsync'
import UserController from '../../controllers/user.controller'
import { catchAsync } from '../../middleware/catchAsync'
const userController =
  container.resolve<UserController>(UserController)

const userRouter = express.Router()

userRouter.get(
  '/getAllUsers',
  auth,
  catchAsync(userController.getAllUser.bind(userController))
)
userRouter.patch(
  '/',
  auth,
  catchAsync(userController.updateUser.bind(userController))
)
userRouter.post(
  '/keyword/add',
  auth,
  catchAsync(userController.addKeyword.bind(userController))
)
userRouter.get(
  '/myKeyword',
  auth,
  catchAsync(userController.getKeywordByUser.bind(userController))
)
userRouter.post(
  '/keyword/delete',
  auth,
  catchAsync(userController.deleteKeyword.bind(userController))
)
userRouter.post(
  '/addOrRemoveFavoriteUser',
  auth,
  catchAsync(
    userController.addOrRemoveFavoriteUser.bind(userController)
  )
)
export default userRouter
