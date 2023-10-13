import mongoose from 'mongoose'
const recordSchema = new mongoose.Schema(
  {
    recordUrl: {
      word: String,
      sentence: String
    },
    vocabulary: {
      type: mongoose.Types.ObjectId,
      ref: 'vocabulary',
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

const RecordModel = mongoose.model('record', recordSchema)
export default RecordModel
