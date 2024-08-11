const {
  fetchUserDetails,
  updateProfile,
  deleteUser,
} = require('../Controllers/UserController')

const isAuthenticated = require('../Middlewares/Auth')

const router = require('express').Router()

router.get('/fetchUserDetails', isAuthenticated, fetchUserDetails)
router.post('/updateProfile', isAuthenticated, updateProfile)
router.delete('/deleteUser', isAuthenticated, deleteUser)

module.exports = router
