const request = require('supertest')
const app = require('../src/app')
const Tasks = require('../src/models/task')
const { userOneId, userOne, setupDatabase, userTwo, userTwoId, taskOne, taskTwo, taskThree } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

        const task = await Tasks.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)
})

test('Should get all tasks for user one', async () => {
    const response =  await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should fail if userTwo tries to delete userOne task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Tasks.findById(taskOne._id)
    expect(task).not.toBeNull()
    expect(task.owner.toString()).toBe(userOneId.toString())
})