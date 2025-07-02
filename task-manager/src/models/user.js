const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Tasks = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('password cannot be password');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive number');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token

}


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}



//Hash plain text pw before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

//Delete user tasks when user is removed
//.REMOVE IS DEPRECATED SO JUST MAKE THIS IN DELETE ROUTER INSTEAD OR YOU WOULD USE 
// userSchema.pre('remove', async function (next) {
//   const user = this;
//   await Tasks.deleteMany({ owner: user._id })

//   next()
// })

// userSchema.pre('findOneAndDelete', async function (next) {
//   const user = await this.model.findOne(this.getFilter());
//   if (user) {
//     await Tasks.deleteMany({ owner: user._id });
//   }
//   next();
// }); // would use this instead and then use User.findOneAndDelete({_id: req.user._id}) in router 


const User = mongoose.model('User', userSchema);

module.exports = User;
