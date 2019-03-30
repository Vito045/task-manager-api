const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRoute = require('./routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRoute);

module.exports = app;