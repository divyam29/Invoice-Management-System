const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

connectDB()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

var port = process.env.PORT
app.set('port', port)
app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`)
})

module.exports = app
