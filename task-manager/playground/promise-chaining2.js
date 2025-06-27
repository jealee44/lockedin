require('../src/db/mongoose')
const Tasks = require('../src/models/task')



Tasks.findByIdAndDelete('685eb5e3c3d8620d1f4b58d6').then((task) => {
    console.log(task)
    return Tasks.countDocuments({completed: false})
}).then((result ) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})