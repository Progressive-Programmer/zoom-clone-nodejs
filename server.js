const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();
const server = require('http').Server(app);
const io  = require('socket.io')(server);
const {v4: uuidv4 } = require('uuid');
const peerServer  = ExpressPeerServer(server, {debug: true})



// Declaring to use EJS as view engine 
app.set('view engine', 'ejs');

// What is this doing here? 
app.use(express.static('public'));



app.use('/peerjs', peerServer);

// respond with "hello world" when a GET request is made to the homepage
// Step 1: redirect home route '/' to '/uuid'
app.get('/', function (req, res) {
  res.redirect(`/${uuidv4()}`)
})
// Step 2: render new route with room.ejs
app.get('/:room', (req, res)=> {
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket =>{
  socket.on('join-room', (roomId, userId)=>{
    socket.join(roomId);
    socket.to(roomId).emit( 'user-connected', userId);
  })
})

server.listen(3030);
