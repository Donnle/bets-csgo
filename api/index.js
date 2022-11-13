const express = require('express')
const HLTVRouter = require('./routes/hltv')
const AuthRouter = require('./routes/auth')
const mongoose = require('mongoose')

const PORT = 2004

const app = express()

app.use(express.json())
app.use('/api/hltv', HLTVRouter)
app.use('/api/auth', AuthRouter)

const start = async () => {

  await mongoose.connect('mongodb+srv://admin:admin@databases.rudz7.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Success connected')
  })
  app.listen(PORT, 'localhost', () => {
    console.log(`Added listener on port: ${PORT}`)
  })
}

start()
