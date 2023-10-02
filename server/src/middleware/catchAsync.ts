import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces/common'
type AsyncFunction = (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => Promise<void>

export const catchAsync = (fn: AsyncFunction) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      fn(req, res, next).catch((err: Error) => {
        return res.error(err.message, err.stack)
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.error(err.message, err.stack)
      }
      return res.error('Uncaught error')
    }
  }
}
