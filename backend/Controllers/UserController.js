const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User')

const fetchUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findOne({ email: decodedToken.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false })
    }
    res.status(200).json({
      message: 'User details fetched successfully',
      success: true,
      data: {
        name: user.name,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        about: user.about,
      },
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findOne({ email: decodedToken.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false })
    }
    const { name, age, dateOfBirth, gender, about } = req.body
    user.name = name
    user.age = age
    user.dateOfBirth = dateOfBirth
    user.gender = gender
    user.about = about
    await user.save()
    res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      data: {
        name: user.name,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        about: user.about,
      },
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findOne({ email: decodedToken.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false })
    }
    await UserModel.deleteOne({ email: decodedToken.email })
    res.status(200).json({
      message: 'User deleted successfully',
      success: true,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}

module.exports = {
  fetchUserDetails,
  updateProfile,
  deleteUser,
}
