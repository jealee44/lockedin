//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID 
const { MongoClient, ObjectId } = require('mongodb') //shorthand way from above

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()

 
MongoClient.connect(connectionURL)
  .then(client => {
    const db = client.db(databaseName);

    return db.collection('users').insertOne({
      _id: id,
      name: 'Andrea',
      age: 26
    })
      .then(result => {
        console.log('Inserted ID:', result.insertedId);
        return client.close();
      });
  })
  .catch(err => {
    console.log('Unable to connect to database!', err);
  });

// const client = new MongoClient(connectionURL);

// async function run() {
//     try {

//         const db = client.db(databaseName);
//         const tasks = db.collection('tasks');

//         const tasksToInsert = [
//             { description: 'Went outside', completed: true },
//             { description: 'Touched grass', completed: true},
//             { description: 'Ate breakfast', completed: false}
//         ]

//         const result = await tasks.insertMany(tasksToInsert);

//         console.log(`${result.insertedCount} documents were inserted`);
//     } finally {
//         await client.close();
//     }
// } run ().catch(console.dir)