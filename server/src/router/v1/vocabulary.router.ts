// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import VocabularyController from '../../controllers/vocabulary.controller'
import { catchAsync } from '../../middleware/catchAsync'
import auth from '../../middleware/auth'
const vocabularyController = container.resolve<VocabularyController>(
  VocabularyController
)

const vocabularyRouter = express.Router()

vocabularyRouter.get(
  '/',
  auth,
  catchAsync(
    vocabularyController.getVocabulariesOffset.bind(
      vocabularyController
    )
  )
)

export default vocabularyRouter
