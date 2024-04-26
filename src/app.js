const express = require('express');
const { testsRouter } = require('./routes/test.router');

const port = 8080; 

console.log("NODE_ENV:", process.env.NODE_ENV) //<----NODE_ENV [development/production] add "set NODE_ENV=production && ..." to package.json

const app = express();

app.use('/api/test', testsRouter)


app.listen(port, ()=>console.log(`up and running on port ${port} pid ${process.pid}`))