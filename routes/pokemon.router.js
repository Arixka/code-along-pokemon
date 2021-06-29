const router = require('express').Router()

const {
  authenticate,
  authorize
} = require('../utils/auth')

const {
  getPokemons,
  getPokemonsByParams,
  createPokemon,
  getTypes,
  getMoves
} = require('../controller/pokemon.controller')

router.get('/', authenticate, getPokemons)
router.get('/type/:type/move/:move', authenticate, getPokemonsByParams)
router.post('/', authenticate, authorize(['master', 'admin']), createPokemon)

router.get('/types', authenticate, getTypes)

router.get('/moves', authenticate, getMoves)

module.exports = router