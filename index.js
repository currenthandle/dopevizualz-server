const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./database.js')

const app = express()

const PORT = process.env.PORT || 3000
app.use(bodyParser.json())

app.get('/preset', async (req, res) => {
  const db = await connect()
  const presets = await db.collection('presets').find().toArray()
  res.json(presets)
})

app.post('/preset', async (req, res) => {
  const db = await connect()
  const preset = await db.collection('presets').insertOne(req.body)
  res.json(preset)
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
