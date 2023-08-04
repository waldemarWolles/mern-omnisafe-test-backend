import mongoose from 'mongoose'
import UserModel from './UserModel.js'

const EventTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    eventsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.ObjectId,
      ref: UserModel,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('EventType', EventTypeSchema)
