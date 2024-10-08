const request = require('supertest')
const Task = require('../src/models/task')
const app = require("../src/app");
const { userOneId, userOne, userTwo, userTwoId, taskOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);
test('should create task for user', async () => { 
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my laptop'
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
 })

 test('should get tasks for user one', async () => { 
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    expect(response.body.length).toEqual(2)
  })

  test('should not delete task by someone else', async () => { 
    const reponse = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    //Assert that task is not deleted 
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
   })