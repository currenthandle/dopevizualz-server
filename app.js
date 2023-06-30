// console.log('hello world')
require('dotenv').config()
// console.log('1111', process.env.DB_URL)
const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./database.js')
const cors = require('cors')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
app.use(bodyParser.json({ limit: '1000kb' }))

// post the presets to the database api

app.get('/preset', async (req, res) => {
  console.log('inciminbg')
  const db = await connect()
  const presets = await db.collection('presets').find().toArray()
  console.log('presets', presets)
  // res.json(presets)
  // send the response as json but set everything necessary for CORS
  // headers , etc...
  res.json(presets)
})

app.post('/preset', async (req, res) => {
  console.log('req.body', req.body)
  console.log('inciminbg')
  const db = await connect()
  const preset = await db.collection('presets').insertOne(req.body)
  res.json(preset[0])
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
