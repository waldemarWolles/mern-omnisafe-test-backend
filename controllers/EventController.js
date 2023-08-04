import EventModel from '../models/EventModel.js'
import EventTypeModel from '../models/EventTypeModel.js'

export const getAll = async (req, res) => {
  try {
    const userId = req.userId
    const events = await EventModel.find({ user: userId })

    res.status(200).json(events)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const eventId = req.params.id
    const event = await EventModel.findOne({ _id: eventId })

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      })
    }

    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const create = async (req, res) => {
  try {
    const userId = req.userId

    const doc = new EventModel({
      name: req.body.name,
      description: req.body.description,
      eventDate: req.body.eventDate,
      activityStatus: req.body.activityStatus,
      eventType: req.body.eventType,

      user: userId,
    })

    const updateEventsCountForEventType = await EventTypeModel.findOneAndUpdate(
      {
        name: req.body.eventType,
        user: userId,
      },
      {
        $inc: {
          eventsCount: 1,
        },
      },
      {
        new: true, // Set the 'new' option to 'true' to return the updated document
      }
    )

    if (!updateEventsCountForEventType) {
      return res.status(404).json({
        message: 'No Event Type for event found',
      })
    }

    const event = await doc.save()

    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const update = async (req, res) => {
  try {
    const userId = req.userId
    const eventId = req.params.id
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventId },

      {
        name: req.body.name,
        description: req.body.description,
        eventDate: req.body.eventDate,
        activityStatus: req.body.activityStatus,
        eventType: req.body.eventType,

        user: userId,
      },

      { new: true }
    )

    if (!updatedEvent) {
      return res.status(404).json({
        message: 'Could not find event to update',
      })
    }

    res.status(200).json(updatedEvent)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const userId = req.userId
    const eventId = req.params.id
    const deletedEvent = await EventModel.findOne({ _id: eventId })

    if (!deletedEvent) {
      return res.status(404).json({
        message: 'Event not found',
      })
    }

    const updateEventsCountForEventType = await EventTypeModel.findOneAndUpdate(
      {
        name: deletedEvent.eventType,
        user: userId,
      },
      {
        $inc: {
          eventsCount: -1,
        },
      },
      {
        new: true, // Set the 'new' option to 'true' to return the updated document
      }
    )

    if (!updateEventsCountForEventType) {
      return res.status(404).json({
        message: 'No Event Type for event found',
      })
    }

    deletedEvent.deleteOne()

    res.status(200).json({
      message: 'Event deleted',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong with deleting the event ',
    })
  }
}
