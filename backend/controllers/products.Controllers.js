const asyncHandler = require('express-async-handler')
const Product = require('../models/products.Models')

const getProducts = asyncHandler( async (req, res) => {

    const products = await Product.find({user: req.user.id}) 

    res.status(200).json(products)
})

const setProducts = asyncHandler( async (req, res) => {

    if(!req.user.isAdmin){
        res.status(404)
        throw new Error('You do not have permission to add products')
    }

    if(!req.body){
        res.status(404)
        throw new Error('Add a product')
    }

    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        user: req.user.id
    })

    res.status(201).json(product)
})

const updateProduct = asyncHandler( async (req, res) => {
    if(!req.user.isAdmin){
        res.status(404)
        throw new Error('You do not have permission to modify this product')
    }

    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error ('Product not found')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Access denied, you cannot modify this product')
    }

    const modifiedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(modifiedProduct)
})

const deleteProduct = asyncHandler( async (req, res) => {

    if(!req.user.isAdmin){
        res.status(404)
        throw new Error('You do not have permission to add products')
    }
    
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400)
        throw new Error ('Product not found')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Access denied, you cannot delete this product')
    }

    await product.deleteOne()
    res.status(200).json('Product deleted')   
})

module.exports = {
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct
}