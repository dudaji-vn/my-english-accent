import mongoose from 'mongoose'
const groupSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    members: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const GroupModel = mongoose.model('group', groupSchema)
export default GroupModel
