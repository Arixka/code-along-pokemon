const router = require('express').Router()

const pokemonRouter = require('./pokemonRouter.js')
const authRouter = require('./authRouter.js')

router.use('/pokemons', pokemonRouter)
router.use('/auth', authRouter)

module.exports = router