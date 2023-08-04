import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from './../models/UserModel.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '100d',
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.status(200).json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: 'Wrong login or pasword',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '100d',
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.status(200).json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const updateInfo = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.userId, { name: req.body.name, surname: req.body.surname }, { new: true })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: 'Wrong login or pasword',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '100d',
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.status(200).json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.status(200).json({
      ...userData,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
