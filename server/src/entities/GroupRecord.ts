import mongoose from 'mongoose'
const groupRecordSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'group',
      required: true
    },
    record: {
      type: mongoose.Types.ObjectId,
      ref: 'record',
      required: true
    }
  },
  {
    timestamps: true
  }
)

groupRecordSchema.index({ group: 1, record: 1 }, { unique: true })

const GroupRecordModel = mongoose.model(
  'groupRecord',
  groupRecordSchema
)
export default GroupRecordModel
