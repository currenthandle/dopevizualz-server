// console.log('hello world')
require('dotenv').config()
// console.log('1111', process.env.DB_URL)
const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./database.js')
const cors = require('cors')
const { ObjectId } = require('mongodb')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
app.use(bodyParser.json({ limit: '1000kb' }))

// post the presets to the database api

app.get('/preset', async (req, res) => {
  const db = await connect()
  const presets = await db.collection('presets').find().toArray()
  res.json(presets)
})

app.get('/preset/:id', async (req, res) => {
  const db = await connect()
  const preset = await db
    .collection('presets')
    .findOne({ _id: new ObjectId(req.params.id) })
  res.json(preset)
})

app.post('/preset', async (req, res) => {
  const db = await connect()
  const preset = await db.collection('presets').insertOne(req.body)
  res.json(preset[0])
})

app.delete('/preset', async (req, res) => {
  const db = await connect()
  const preset = await db.collection('presets').deleteMany()

  res.json(preset)
})

app.delete('/preset/:id', async (req, res) => {
  const db = await connect()
  const preset = await db
    .collection('presets')
    .deleteOne({ _id: new ObjectId(req.params.id) })
  res.json(preset)
})

// untested
app.put('/preset/:id', async (req, res) => {
  const db = await connect()
  const preset = await db
    .collection('presets')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.json(preset)
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
