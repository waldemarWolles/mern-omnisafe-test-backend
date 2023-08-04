import EventTypeModel from '../models/EventTypeModel.js'

export const getAll = async (req, res) => {
  try {
    const userId = req.userId
    const eventTypes = await EventTypeModel.find({ user: userId }).populate('user').exec()

    res.status(200).json(eventTypes)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new EventTypeModel({
      name: req.body.name,
      imageUrl: req.body.imageUrl,

      user: req.userId,
    })

    const eventType = await doc.save()
    res.status(200).json(eventType)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const eventTypeId = req.params.id
    const deletedEventType = await EventTypeModel.findOneAndDelete({ _id: eventTypeId })

    if (!deletedEventType) {
      return res.status(404).json({
        message: 'Event type not found',
      })
    }

    res.status(200).json({
      message: 'Event type deleted successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong with deleting the event type',
    })
  }
}
