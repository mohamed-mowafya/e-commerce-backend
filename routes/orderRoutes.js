const express = require('express'); 
const router  = express.Router(); 

const orderController = require('../controllers/orderController')

router.get('/order:id', orderController.getUserOrders)
router.post('/order:id', orderController.addOrder)

module.exports = router;