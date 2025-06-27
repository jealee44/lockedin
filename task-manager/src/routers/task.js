const express = require('express')
const router = express.Router()
const Tasks = require('../models/task')

router.post('/tasks', async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tasks', async (req, res) => {
    try {
        const findAllTasks = await Tasks.find({})
        res.status(200).send(findAllTasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const getTask = await Tasks.findById(_id)

        if (!getTask) {
            res.status(404).send()
        }

        res.status(200).send(getTask)
    } catch (error){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return validUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid update'})
  }
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

    if (!task) {
      return res.status(404).send()
    }

    res.status(200).send(task)

  } catch(e){
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id)

    if (!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router