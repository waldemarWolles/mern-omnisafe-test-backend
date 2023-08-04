import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1]

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'secret')

      req.userId = decodedToken._id
      next()
    } catch (error) {
      return res.status(403).json({
        message: 'No access',
      })
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    })
  }
}
