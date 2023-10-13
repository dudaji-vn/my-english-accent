// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import VocabularyController from '../../controllers/vocabulary.controller'
import { catchAsync } from '../../middleware/catchAsync'
const vocabularyController = container.resolve<VocabularyController>(
  VocabularyController
)

const vocabularyRouter = express.Router()

vocabularyRouter.get(
  '/',
  catchAsync(
    vocabularyController.getVocabularies.bind(vocabularyController)
  )
)

export default vocabularyRouter
