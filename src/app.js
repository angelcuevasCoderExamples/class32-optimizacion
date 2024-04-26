const express = require('express');
const { testsRouter } = require('./routes/test.router');
const { compressionRouter } = require('./routes/compression.router');
const compression = require('express-compression');
const { usersRouter } = require('./routes/users.router');
const errorHandling = require('./middlewares/errorHandling.middleware');

const port = 8080; 

console.log("NODE_ENV:", process.env.NODE_ENV) //<----NODE_ENV [development/production] add "set NODE_ENV=production && ..." to package.json

const app = express();

/**MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(compression({
  threshold: 5000000,
  brotli: {enabled: true, zlib:{}}
})) 


app.use('/api/test', testsRouter)
app.use('/api/compression', compressionRouter)
app.use('/api/users', usersRouter)

app.listen(port, ()=>console.log(`up and running on port ${port} pid ${process.pid}`))

app.use(errorHandling)