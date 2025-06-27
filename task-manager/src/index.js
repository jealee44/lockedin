const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/tasks', async (req, res) => {
    try {
        const findAllTasks = await Tasks.find({})
        res.status(200).send(findAllTasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
