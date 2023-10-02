// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import AuthController from '../../controllers/auth.controller'
import { catchAsync } from '../../middleware/catchAsync'
const authController =
  container.resolve<AuthController>(AuthController)

const authRouter = express.Router()

authRouter.post(
  '/register',
  catchAsync(authController.register.bind(authController))
)

authRouter.post(
  '/login',
  catchAsync(authController.login.bind(authController))
)

export default authRouter
