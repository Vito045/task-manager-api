const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Supervitaliya',
        email: 'vito046@icloud.com',
        password: 'qwerty123'
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'Supervitaliya',
            email: 'vito046@icloud.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe(`qwerty123`);
});

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    // expect(response.body.token).toBe(user.tokens[0].token);
});

test('should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'email@email.email',
        password: 'swordpass'
    }).expect(400);
});

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) //set - to set up headers (Postman)
        .send()
        .expect(200);
});

test('should not get profile unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid use field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: 'Superdupervitaliya'})
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Superdupervitaliya');
});

test('should not updete invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({location: 'Nowher'})
        .expect(400);
});