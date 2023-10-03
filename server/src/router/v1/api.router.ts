import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './auth.router'
import userRouter from './user.router'

const apiRouterV1 = express.Router()

const listApi = [
  {
    path: PATH.auth,
    router: authRouter
  },
  {
    path: PATH.user,
    router: userRouter
  }
]
listApi.forEach((item) => {
  apiRouterV1.use(item.path, item.router)
})

export default apiRouterV1
