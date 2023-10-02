import * as dotenv from 'dotenv'
import 'reflect-metadata'

dotenv.config()

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { IResponse } from './interfaces/common'
import customResponse from './middleware/customResponse'
import apiRouterV1 from './router/v1/api.router'

const app = express()

app.use(express.json())
app.use(cors())

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH']
  }
})

// Routes
app.use(function (req: Request, res: Response, next: NextFunction) {
  res = customResponse(res as IResponse)
  next()
})

app.get('/', (req: Request, res: Response) => {
  return (res as IResponse).success('Hello')
})

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message })
  }
)
app.use('/api', apiRouterV1)
const mongoUrl = process.env.MONGODB_URL
if (mongoUrl) {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
      console.log('Connected to mongo')
    })
    .catch((err) => {
      console.log(err)
    })
}

const port = process.env.PORT || 5000

http.listen(port, () => {
  console.log('Server is running on port', port)
})

module.exports = app
