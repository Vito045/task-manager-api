const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRoute = require('./routers/task');

const app = express();
const port = process.env.PORT;;

app.use(express.json());
app.use(userRouter);
app.use(taskRoute);

app.listen(port, () => console.log('Server is up on port', port));