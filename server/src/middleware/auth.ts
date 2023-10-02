import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../entities/User'
import { IRequest, IResponse } from '../interfaces/common'
const auth = async (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')

    if (!token)
      return res.status(400).json({ msg: 'Invalid Authentication.' })
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET
    if (!tokenSecret) {
      throw Error('token secret is required')
    }
    const decoded = jwt.verify(token, tokenSecret) as any

    if (!decoded)
      return res
        .status(400)
        .json({ message: 'Invalid Authentication.' })

    const user = await UserModel.findOne({ _id: decoded.userId })
    if (!user) {
      throw new Error('user not found in system')
    }
    req.user = user
    req.user.userId = user._id

    next()
  } catch (err) {
    if (err instanceof Error) {
      return res.error(err.message, err.stack, 401)
    }
    return res.error('Uncaught Error in auth middleware', '', 401)
  }
}

export default auth
