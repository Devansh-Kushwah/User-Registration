const Joi = require('joi')

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(10)
      .max(100)
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{10,}$'))
      .required(),
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

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(10)
      .max(100)
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{10,}$'))
      .required(),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error })
  }
  next()
}

module.exports = {
  signupValidation,
  loginValidation,
}
