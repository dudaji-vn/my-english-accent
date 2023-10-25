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
      ref: 'record'
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'group'
    }
  },
  {
    timestamps: true
  }
)

const ListenModel = mongoose.model('listen', listenSchema)
export default ListenModel
