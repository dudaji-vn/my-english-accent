import mongoose from 'mongoose'
export type Role = 'developer' | 'designer' | 'others'
export type Language = 'en' | 'vi' | 'ko'
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
      enum: ['en', 'vi', 'ko'],
      required: true
    },
    role: {
      type: String,
      enum: ['developer', 'designer', 'other'],
      required: true
    },
    avatar: {
      type: String
    },
    autoDownload: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model('user', userSchema)
export default UserModel
