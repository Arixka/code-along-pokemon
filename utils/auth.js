const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

// Authenticate Middleware
exports.authenticate = async (req, res, next) => {
  if (!req.headers.token) {
    res.status(403).json({ error: 'No token found '})
  } else {
    jwt.verify(req.headers.token, process.env.JWT_SECRET || 'secret', (err, token) => {
      if (err) {
        res.status(403).json({ error: 'Token not valid' })
      }
      User.findOne({ email: token.email })
        .then(user => {
          res.locals.user = user
          next()
        })
        .catch(err => res.json(err))
    })
  }
}

exports.authorize = roles => {
  return (req, res, next) => {
    if (!roles.includes(res.locals.user.role)) {
      res.status(403).send('Acces denied')
    }
    next()
  } 
}
