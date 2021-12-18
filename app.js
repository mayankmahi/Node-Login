require('dotenv').config()
var express = require('express')
var app = express()
const connection = require('./config/database')
const userRouter = require('./api/users/user.router')

app.use(express.json()) // for parsing application/json

app.use('/api/users', userRouter)

app.get('/api', (req, res) => {
  res.json({
    status: 1,
    message: 'Welcome to the API'
  })
})

app.listen(process.env.APP_PORT || 3001, () => {
  connection.connect(function (err) {
    if (err) throw err
    console.log('Database is connected User Login')
    console.log(`Server is running on port ${process.env.APP_PORT || 3000}`)
  })
})
