const { MongoClient } = require('mongodb')

// console.log('process', process.env)
// const url = process.env.DB_URL
// console.log('url', url)
const url =
  'mongodb+srv://dopevisualz:dopevisualz@cluster0.ksvw7wm.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)

const dbName = 'dopevisualz'

module.exports = async () => {
  await client.connect()
  const db = client.db(dbName)
  return db
}
