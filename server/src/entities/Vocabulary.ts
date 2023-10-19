import mongoose from 'mongoose'
const vocabularySchema = new mongoose.Schema(
  {
    text: {
      en: {
        type: String,
        required: true
      },
      vi: {
        type: String,
        required: true
      },
      ko: {
        type: String,
        required: true
      }
    },
    pronunciation: {
      type: String,
      required: true
    },
    example: {
      en: {
        type: String,
        required: true
      },
      vi: {
        type: String,
        required: true
      },
      ko: {
        type: String,
        required: true
      }
    },

    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const VocabularyModel = mongoose.model('vocabulary', vocabularySchema)

export default VocabularyModel
