import mongoose from 'mongoose'
const recordSchema = new mongoose.Schema(
  {
    recordUrl: {
      type: String,
      required: true
    },
    dictionary: {
      type: mongoose.Types.ObjectId,
      ref: 'dictionary',
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
