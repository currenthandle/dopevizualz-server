const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./database.js')

const app = express()

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

app.listen(3000, () => {
  console.log('listening on 3000')
})
