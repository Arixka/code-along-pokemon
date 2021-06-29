const router = require('express').Router()

const {
  authenticate,
  authorize
} = require('../utils/auth')

const {
  whoami,
  getUser,
  getUserById,
  deleteUser,
  updateUser
} = require('../controller/user.controller')

router.get('/me', authenticate, whoami)
router.get('/', authenticate, getUser)
router.get('/:userId', authenticate, getUserById)
router.delete('/', authenticate, authorize(['admin']), deleteUser)
router.put('/', authenticate, updateUser)

module.exports = router