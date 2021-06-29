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
router.get('/', authenticate, getUser) // get users by query, returns array of users
router.get('/:userId', authenticate, getUserById)
router.delete('/:userId', authenticate, authorize(['admin']), deleteUser)
router.put('/', authenticate, authorize(['master', 'admin']), updateUser) // update user by query

module.exports = router