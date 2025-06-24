//CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL)
  .then(client => {
    
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Jea',
        age: 27
    })

  })
  .catch(err => {
    console.log('Unable to connect to database!', err)
  })