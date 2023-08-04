import mongoose from 'mongoose'
import UserModel from './UserModel.js'

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    eventDate: {
      type: Date,
      required: true,
    },
    activityStatus: {
      type: Boolean,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: UserModel,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Event', EventSchema)
