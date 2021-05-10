const express = require('express')
const gamesController = require('../controllers/games')

const router = express.Router()

const auth = require('../middleware/auth')



router.get('/', auth,  gamesController.getGames)

router.get('/:id', auth, gamesController.getOne)

router.post('/', auth, gamesController.createGames)

router.put('/:id', auth, gamesController.updateGames)

router.delete('/:id', auth, gamesController.deleteGames)


module.exports = router;