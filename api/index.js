const express = require('express')
const HLTVRouter = require('./routes/hltv')

const PORT = 2004


const app = express()

app.use(express.json())
app.use('/api', HLTVRouter)

const start = () => {
  app.listen(PORT, 'localhost', () => {
    console.log(`Added listener on port: ${PORT}`)
  })
}

start()
