const express = require('express')
const router = express.Router()
const User = require('../models/user');
const auth = require('../middleware/auth')
const Tasks = require('../models/task')


router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token}) 
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
});


router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send( {error: 'Invalid updates!'})
  }

  try {
    // const user = await User.findOne(req.user) DONT NEED this because authmiddleware already found us our req.user

    updates.forEach((update) => {
        req.user[update] = req.body[update]
    })

    await req.user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    
    await Tasks.deleteMany({owner: req.user._id})
    await req.user.deleteOne();
    res.send(req.user)
    } catch(e) {
    res.status(500).send(e)
  }
})



module.exports = router