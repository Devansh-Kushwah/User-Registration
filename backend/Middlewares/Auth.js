const jwt = require('jsonwebtoken')
const Joi = require('joi')

const isAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization'].split(' ')[1]
  if (!auth) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, JWT token is require' })
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, JWT token wrong or expired' })
  }
}

const ValidateProfile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    age: Joi.number().min(0).max(120).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    about: Joi.string().max(5000),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error })
  }
  next()
}

module.exports = { isAuthenticated, ValidateProfile }
