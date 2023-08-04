import { body } from 'express-validator'

export const loginValidation = [body('email', 'Email is Wrong').isEmail(), body('password').isLength({ min: 5 })]

export const registerValidation = [
  body('email', 'Email is Wrong').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 2 }),
  body('surname').isLength({ min: 2 }),
]

export const userInfoUpdateValidation = [body('name').optional().isLength({ min: 2 }), body('surname').optional().isLength({ min: 2 })]

export const createEventTypeValidation = [body('name').isLength({ min: 2 }), body('imageUrl').optional()]

export const createEventValidation = [
  body('name').isLength({ min: 2 }),
  body('description').optional().isLength({ min: 2 }),
  body('eventDate').isDate(),
  body('activityStatus').isBoolean(),
  body('eventType').isString(),
]

export const updateEventValidation = [
  body('name').optional().isLength({ min: 2 }),
  body('description').optional().isLength({ min: 2 }),
  body('eventDate').optional().isDate(),
  body('activityStatus').optional().isBoolean(),
  body('eventType').isString(),
]
