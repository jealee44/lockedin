const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Tasks = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
  try {
    const task = await Tasks.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks')
        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const getTask = await Tasks.findOne({_id, owner: req.user._id})

        if (!getTask) {
            res.status(404).send()
        }

        res.status(200).send(getTask)
    } catch (error){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return validUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid update'})
  }
  try {
    const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id})
    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
    if (!task) {
      return res.status(404).send()
    }
    updates.forEach((update) => {
        task[update] = req.body[update]
    })
    await task.save()
    res.status(200).send(task)
  } catch(e){
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id})

    if (!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router