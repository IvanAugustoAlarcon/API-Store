const express = require('express')
const { getProducts, setProducts, updateProduct, deleteProduct } = require('../controllers/products.Controllers')
const router = express.Router()
const { protect } = require('../middleware/auth.Middleware')

router.route('/').get(protect, getProducts).post(protect, setProducts)

router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct)
module.exports =router