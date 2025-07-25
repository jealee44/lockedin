const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Tasks = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Kevin',
    email: 'kevin@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Andrea',
    email: 'andrea@example.com',
    password: '567what!!',
    tokens: [{
        token: jwt.sign({_id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: true,
    owner: userTwo._id
}



const setupDatabase = async () => {
     await User.deleteMany()
     await Tasks.deleteMany()
     await new User(userOne).save()
     await new User(userTwo).save()
     await new Tasks(taskOne).save()
     await new Tasks(taskTwo).save()
     await new Tasks(taskThree).save()
}



module.exports = {
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}