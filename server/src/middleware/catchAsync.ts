import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces/common'
import { UnAuthorizeError } from '../interfaces/dto/Error'
type AsyncFunction = (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => Promise<void>

export const catchAsync = (fn: AsyncFunction) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      fn(req, res, next).catch((err: Error) => {
        if (err instanceof UnAuthorizeError) {
          return res.error(401, err.message, err.stack)
        }
        return res.error(500, err.message, err.stack)
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.error(500, err.message, err.stack)
      }
      return res.error(500, 'Uncaught error')
    }
  }
}
