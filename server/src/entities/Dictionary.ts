import mongoose from 'mongoose'
const dictionarySchema = new mongoose.Schema(
  {
    wordOrExpression: {
      type: String,
      required: true
    },
    textKorean: {
      type: String,
      required: true
    },
    textVietNam: {
      type: String,
      required: true
    },
    example: {
      type: String,
      required: true
    },
    exampleVI: {
      type: String,
      required: true
    },
    exampleKR: {
      type: String,
      required: true
    },
    wordType: {
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

const DictionaryModel = mongoose.model('dictionary', dictionarySchema)
export default DictionaryModel
