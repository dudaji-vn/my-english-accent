import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './auth.router'
import userRouter from './user.router'
import fileRouter from './file.router'
import vocabularyRouter from './vocabulary.router'
import recordRouter from './record.router'

const apiRouterV1 = express.Router()

const listApi = [
  {
    path: PATH.auth,
    router: authRouter
  },
  {
    path: PATH.user,
    router: userRouter
  },
  {
    path: PATH.file,
    router: fileRouter
  },
  {
    path: PATH.vocabulary,
    router: vocabularyRouter
  },
  {
    path: PATH.record,
    router: recordRouter
  }
]
listApi.forEach((item) => {
  apiRouterV1.use(item.path, item.router)
})

export default apiRouterV1
