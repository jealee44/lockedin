const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const Task = require('./models/task')
const User = require('./models/user')

const app = express();
const port = process.env.PORT || 3000;


// app.use((req, res, next ) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log('Server is up on port ' + port);
});


