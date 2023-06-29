const { MongoClient } = require('mongodb')

const url = process.env.DB_URL
const client = new MongoClient(url)

const dbName = 'dopevisualz'

module.exports = async () => {
  await client.connect()
  const db = client.db(dbName)
  return db
}
