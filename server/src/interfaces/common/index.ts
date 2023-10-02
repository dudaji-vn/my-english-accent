import { Request, Response } from 'express'
export interface IRequest extends Request {
  user: any
}
export interface IResponse extends Response {
  success<T>(data: T): IResponse
  error(
    message?: string,
    messageDetail?: string,
    statusCode?: number
  ): IResponse
}

export interface IMedia {
  type: string
  url: string
}
