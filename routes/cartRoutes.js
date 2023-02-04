const express = require('express'); 
const router  = express.Router(); 

const cartController = require('../controllers/cartController')

router.get('/cart/:id',cartController.getCart)
router.post('/cart/:id',cartController.addToCart)
router.delete('/cart/:id',cartController.removeFromCart)

module.exports = router;