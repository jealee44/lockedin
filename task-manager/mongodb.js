// //CRUD create read update delete

// // const mongodb = require('mongodb')
// // const MongoClient = mongodb.MongoClient
// // const ObjectID = mongodb.ObjectID 
// const { MongoClient, ObjectId } = require('mongodb') //shorthand way from above

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

 
// // MongoClient.connect(connectionURL)
// //   .then(client => {
// //     const db = client.db(databaseName);

// //     return db.collection('users').insertOne({
// //       _id: id,
// //       name: 'Andrea',
// //       age: 26
// //     })
// //       .then(result => {
// //         console.log('Inserted ID:', result.insertedId);
// //         return client.close();
// //       });
// //   })
// //   .catch(err => {
// //     console.log('Unable to connect to database!', err);
// //   });

// const client = new MongoClient(connectionURL, { serverSelectionTimeoutMS: 2000 });

// // async function run() {
// //     try {

// //         const db = client.db(databaseName);
// //         const tasks = db.collection('tasks');

// //         const tasksToInsert = [
// //             { description: 'Went outside', completed: true },
// //             { description: 'Touched grass', completed: true},
// //             { description: 'Ate breakfast', completed: false}
// //         ]

// //         const result = await tasks.insertMany(tasksToInsert);

// //         console.log(`${result.insertedCount} documents were inserted`);
// //     } finally {
// //         await client.close();
// //     }
// // } run ().catch(console.dir)

// // async function run() {
// //     try {
// //         await client.connect()
// //         const db = client.db(databaseName);
// //         const users = db.collection('users');

// //         // const result = await users.findOne({ _id: new ObjectId("685ae8cd239c6f79975932e7")});

// //         const docs = await users.find({ age: 27 }).toArray()
// //         console.log(docs)

// //         const count = await users.countDocuments({ age: 27 })
// //         console.log(count)

// //         // console.log(result)
// //     } finally {
// //         await client.close();
// //     }
// // } run().catch(console.dir)


// // client.connect()
// // .then(() => {
// //     const db = client.db(databaseName);
// //     const users = db.collection('users');
// //     return users.findOne({ _id: new ObjectId("685ae8cd239c6f79975932e7")});
// // })
// // .then(result => {
// //     console.log(result)
// // })
// // .catch(err => {
// //     console.error('Database operation failed: ', err)
// // })
// // .finally(() => {
// //     client.close();
// // })

// // async function runTasks() {
// //     try {
// //         await client.connect();
// //         const db = client.db(databaseName)
// //         const tasks = db.collection('tasks');

// //         const result = await tasks.findOne({ _id: new ObjectId('685ad0eff75d67661aebac18')})
// //         console.log(result)

// //         const docs = await tasks.find({completed: true}).toArray();
// //         console.log(docs)

// //     } finally {
// //         await client.close();
// //     }
// // } runTasks().catch(console.dir)

// // async function updateUser() {
// //     try {
// //         await client.connect();
// //         const db = client.db(databaseName);
// //         const users = db.collection('users');

// //         const result = await users.updateOne({ _id: new ObjectId('685a05d4b0cd1e0e7b531a8a')}, 
// //             {$set: {
// //                 name: 'Pike'
// //             }})
// //         console.log(result)
// //     } finally {
// //         await client.close();
// //     }
// // } updateUser().catch(console.dir)

// // async function updateTasks() {
// //     try {
// //         await client.connect();
// //         const db = client.db(databaseName);
// //         const tasks = db.collection('tasks');

// //         const filter = { completed: false }
// //         const updateDocs = {
// //             $set: {
// //                 completed: true
// //             }
// //         }

// //         const result = await tasks.updateMany(filter, updateDocs)
// //         console.log(result)
// //     } finally {
// //         await client.close()
// //     }
// // }updateTasks().catch(console.dir)

// async function deleteUsers() {
//     try {
//         await client.connect();
//         const db = client.db(databaseName);
//         const users = db.collection('users');
//         const query = { age: 27 };

//         const deletedDocs = await users.deleteMany(query)
//         console.log("Deleted " + deletedDocs.deletedCount + " documents.");

//     } finally {
//         await client.close();
//     }
// } deleteUsers().catch(console.dir)