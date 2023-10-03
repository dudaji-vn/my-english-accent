import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    nativeLanguage: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    role: {
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

const UserModel = mongoose.model('user', userSchema)
export default UserModel
