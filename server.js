const express = require('express');
const app = express();
const server = require('http').Server(app);
const {v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res)=> {
    res.render('room', {roomId: req.params.room})
})

server.listen(3030);
