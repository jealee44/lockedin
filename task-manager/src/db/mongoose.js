const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('password cannot be password')
            }
        }
    },
    age: {
        type: Number,
        default: 0, 
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    }
})

// const me = new User({
//     name: 'Jea.   ',
//     email: 'jealee44@gmail.com',
//     age: 29,
//     password: 'legitpass1'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     if (error.errors) {
//         for (let field in error.errors) {
//             console.log(`${field}: ${error.errors[field].message}`)
//         }
//     } else {
//         console.log(error)
//     }
// })

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true

    },
    completed: {
        type: Boolean,
        default: false
    }
})

async function newTask() {
    try {
        await mongoose.connect(('mongodb://127.0.0.1:27017/task-manager-api'), { serverSelectionTimeoutMS: 2000});
        const task = await Tasks.create({
            description: 'test',
            completed: true
           
        });
        console.log(task)
    } catch (error) {
        if (error.errors) {
            for (let field in error.errors) {
                console.log(`${field}: ${error.errors[field].message}`)
            }
        } else {
            console.error(error)
        }
    } finally {
        await mongoose.connection.close()
    }} newTask()


module.exports = mongoose;