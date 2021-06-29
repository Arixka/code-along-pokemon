const router = require('express').Router()

const pokemonRouter = require('./pokemon.router.js')
const authRouter = require('./auth.router.js')
const userRouter = require('./user.router.js')


router.use('/pokemons', pokemonRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router