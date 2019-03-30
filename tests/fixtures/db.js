const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user'); 
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'example@mail.com',
    password: 'qwerty123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Jonny',
    email: 'doubleexample@mail.com',
    password: 'qwerty123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: '1',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: '2',
    completed: false,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description: '3',
    completed: false,
    owner: userTwoId
}

const setUpDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
}