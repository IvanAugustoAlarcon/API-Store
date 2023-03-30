const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/shop/products', require('./routes/products.Routes'))
app.use('/api/shop/users', require('./routes/users.Routes'))
app.use('/api/shop/order', require('./routes/order.Routes'))

app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))