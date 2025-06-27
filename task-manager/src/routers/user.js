const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const userById = await User.findById(_id);

    if (!userById) {
      return res.status(404).send();
    }

    res.status(200).send(userById);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send( {error: 'Invalid updates!'})
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()

      res.send(user)
    }
  } catch(e) {
    res.status(500).send(e)
  }
})



module.exports = router