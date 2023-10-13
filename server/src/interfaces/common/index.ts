import { Request, Response } from 'express'
export interface IRequest extends Request {
  user: any
}
export interface IResponse extends Response {
  success<T>(data: T): IResponse
  error(
    statusCode?: number,
    message?: string,
    messageDetail?: string
  ): IResponse
}

export interface IMedia {
  type: string
  url: string
}

export interface ICursorParams {
  limit?: number
  cursor?: string
}
export interface ICursorResponse<T> {
  items: T[]
  endCursor: string
  hasNextPage: boolean
}
