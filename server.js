const express = require('express');
const app = express();
const server = require('http').Server(app);



// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.status(200).send('hello world')
})

server.listen(3030);
