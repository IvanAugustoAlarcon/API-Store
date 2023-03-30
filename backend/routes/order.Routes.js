const express = require('express')
const router = express.Router()
const { getOrder, setOrder, updateOrder, deleteOrder } = require('../controllers/order.Controllers')
const { protect } = require('../middleware/auth.Middleware')

router.route('/').get(protect, getOrder).post(protect, setOrder)

router.route('/:id').put(protect, updateOrder).delete(protect, deleteOrder)
module.exports =router