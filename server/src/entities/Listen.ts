import mongoose from 'mongoose'
const listenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    record: {
      type: mongoose.Types.ObjectId,
      ref: 'record',
      unique: true
    }
  },
  {
    timestamps: true
  }
)

const ListenModel = mongoose.model('listen', listenSchema)
export default ListenModel
