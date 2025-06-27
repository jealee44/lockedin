require('../src/db/mongoose')
const Tasks = require('../src/models/task')
const User = require('../src/models/user')

// User.findByIdAndUpdate('685ddd6e89db33777074b209', { age: 5 }, { new: true}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 5})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id) => {
    const task = await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('685ddd6e89db33777074b209').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})