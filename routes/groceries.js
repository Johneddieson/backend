const express = require('express');

const groceryController = require('../controllers/groceries')

const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth, groceryController.getAllGroceries);

router.post('/', auth, groceryController.postGrocery);

router.put('/', auth, groceryController.putGrocery);

router.delete('/:id', auth, groceryController.deleteGrocery);

module.exports = router;