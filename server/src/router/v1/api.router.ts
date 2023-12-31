import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './auth.router'
import userRouter from './user.router'
import fileRouter from './file.router'
import vocabularyRouter from './vocabulary.router'
import recordRouter from './record.router'
import listenRouter from './listen.router'
import groupRouter from './group.router'

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
  },
  {
    path: PATH.listen,
    router: listenRouter
  },
  {
    path: PATH.group,
    router: groupRouter
  }
]
listApi.forEach((item) => {
  apiRouterV1.use(item.path, item.router)
})

export default apiRouterV1
