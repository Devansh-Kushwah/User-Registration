const jwt = require('jsonwebtoken')
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

module.exports = isAuthenticated
