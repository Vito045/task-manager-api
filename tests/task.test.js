const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOneId, userTwoId, userOne, userTwo, taskOne, taskTwo, taskThree, setUpDatabase } = require('./fixtures/db'); 

beforeEach(setUpDatabase);

test('should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'description'
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull(); 
    expect(task.completed).toEqual(false);
});

test('should get all tasks of autherized user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toBe(2);
});

test('should not delete the first task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});