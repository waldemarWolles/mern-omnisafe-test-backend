import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { EventController, EventTypeController, UserController } from './controllers/index.js'
import {
  createEventTypeValidation,
  createEventValidation,
  loginValidation,
  registerValidation,
  updateEventValidation,
  userInfoUpdateValidation,
} from './validations.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'

mongoose
  .connect('mongodb+srv://test:password-test@omnisafeproject.kfetz15.mongodb.net')
  .then(() => console.log('DB is Connected'))
  .catch((error) => console.log(error + 'error'))

const app = express()

app.use(express.json())
app.use(cors())

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.patch('/auth/update', checkAuth, userInfoUpdateValidation, handleValidationErrors, UserController.updateInfo)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/event-types', checkAuth, EventTypeController.getAll)
app.post('/event-types', checkAuth, createEventTypeValidation, handleValidationErrors, EventTypeController.create)
app.delete('/event-types/:id', checkAuth, EventTypeController.remove)

app.get('/events', checkAuth, EventController.getAll)
app.get('/events/:id', checkAuth, EventController.getOne)
app.post('/events', checkAuth, createEventValidation, handleValidationErrors, EventController.create)
app.patch('/events/:id', checkAuth, updateEventValidation, handleValidationErrors, EventController.update)
app.delete('/events/:id', checkAuth, EventController.remove)

app.listen(2222, (error) => {
  if (error) {
    return console.log(error)
  }

  console.log('Server running on port 2222')
})
