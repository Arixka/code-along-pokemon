const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user.model')

exports.signup =(req, res) => {
  if (req.body && req.body.password) {
    const encryptedPass = bcrypt.hashSync(req.body.password, 10)
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPass,
      role: req.body.role
    })
      .then(user => {
        const data = {
            email: user.email,
            role: user.role
          }
        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret', { expiresIn: '7d'})
        res.status(200).json({ token: token, ...data})
      })
      .catch(err => res.status(500).json(err))
  }
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const data = {
            email: user.email,
            role: user.role
          }
          const token = jwt.sign(data, process.env.JWT_SECRET || 'secret', { expiresIn: '7d'})
          res.status(200).json({ token: token, ...data})
        } else {
          res.send('Passwords do not match')
        }
      } else {
        res.send('User email not found')
      }
    })
    .catch(err => res.status(500).send(err))
}