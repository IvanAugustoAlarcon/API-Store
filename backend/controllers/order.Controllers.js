const asyncHandler = require('express-async-handler')
const Order = require('../models/order.Models')

const getOrder = asyncHandler( async (req, res) => {

    const order = await Order.find({user: req.user.id}) 

    res.status(200).json(order)
})

const setOrder = asyncHandler( async (req, res) => {

    if(!req.body){
        res.status(404)
        throw new Error('Add a order')
    }

    const order = await Order.create({
        products: req.body.products,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status,
        user: req.user.id
    })

    res.status(201).json(order)
})

const updateOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        res.status(400)
        throw new Error ('Order not found')
    }

    if(order.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Access denied, you cannot modify this order')
    }

    const modifiedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(modifiedOrder)
})

const deleteOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        res.status(400)
        throw new Error ('Order not found')
    }

    if(order.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Access denied, you cannot delete this order')
    }

    await order.deleteOne()
    res.status(200).json('Order deleted')
})

module.exports = {
    getOrder,
    setOrder,
    updateOrder,
    deleteOrder
}