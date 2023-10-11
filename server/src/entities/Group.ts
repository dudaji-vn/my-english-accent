const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    members: [
      { type: mongoose.Types.ObjectId, ref: 'user', required: true }
    ],
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('group', groupSchema)
