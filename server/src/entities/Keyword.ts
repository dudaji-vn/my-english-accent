import mongoose from 'mongoose'
const keywordSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const KeywordModel = mongoose.model('keyword', keywordSchema)
export default KeywordModel
