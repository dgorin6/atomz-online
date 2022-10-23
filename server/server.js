const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const roomNames = new Set()
const generateRoom = () => {
  let alph = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alph = [...alph];
  let code = "";
  for (let i = 0; i < 5; i++) {
    let letter = alph[Math.floor(Math.random() * alph.length)];
    code =  code + letter;
  }
  return code;
}
io.on("connection", (socket) => {
  socket.on('join', async (room,callback) => {
    if(!roomNames.has(room)) {
      return callback(false);
    }
    const s = await io.in(room).allSockets();
    numInRoom = s.size;
    const fetch = await io.in(room).fetchSockets();
    pause = fetch[0].pause;
    if(numInRoom < 2) {
      socket.join(room);
      socket.room = room;
      if(fetch[0].player == 2) {
        socket.player = 1;
        socket.playAgain = false;
        socket.pause = false;
      } else {
        socket.player = 2;
        socket.playAgain = false;
        socket.pause = false;
      }
      socket.emit('joined');
      socket.emit('player',socket.player);
      if(pause) {
        socket.to(room).emit('resumeGame')
      }
      io.to(room).emit('initGame');
      return callback(true);
    } else {
      return callback(false);
    }
  })
  socket.on('updateBoard',(board,colors) => {
    socket.to(socket.room).emit('updateBoard',board,colors);
  })
  socket.on('changePlayer', () => {
    socket.to(socket.room).emit('changePlayer');
  })
  socket.on('setCurrPlayer', (currPlayer)=> {
    socket.to(socket.room).emit('setCurrPlayer', currPlayer);
  })
  socket.on('createRoom',() => {
    let roomName = generateRoom();
    while(roomNames.has(roomName)) {
      roomName = generateRoom();
    }
    roomNames.add(roomName);
    socket.join(roomName);
    socket.room = roomName;
    socket.player = 1;
    socket.playAgain = false;
    socket.pause = false;
    socket.emit('joined');
    socket.emit('player',socket.player);
    io.to(roomName).emit('roomCode', roomName);
  })
  socket.on('winner',(num) => {
    socket.to(socket.room).emit('winner', num);
  })
  socket.on('play again', async () => {
    const allSockets = await io.in(socket.room).fetchSockets();
    socket.playAgain = true;
    let restartGame = true;
    allSockets.forEach((s) => {
      if(!s.playAgain) {
        restartGame = false;
      }
    })
    if(restartGame) {
      io.to(socket.room).emit('restart');
      allSockets.forEach((s) => {
        s.playAgain = false;
      })
      } else {
      socket.to(socket.room).emit('play again')
      }
  })
  socket.on('leaveRoom', async () => {
    const room = socket.room
    socket.to(socket.room).emit('pauseGame');
    socket.to(socket.room).emit('roomCode', socket.room)
    socket.leave(socket.room);
    const allSockets = await io.in(socket.room).fetchSockets();
    if(allSockets.length > 0) {
      allSockets[0].pause = true
    } else {
      roomNames.delete(room)
    }
  })
  socket.on('disconnect', async () => {
    const room = socket.room
    socket.to(socket.room).emit('pauseGame');
    socket.to(socket.room).emit('roomCode', socket.room)
    socket.leave(socket.room);
    const allSockets = await io.in(socket.room).fetchSockets();
    if(allSockets.length > 0) {
      allSockets[0].pause = true
    } else {
      roomNames.delete(room)
    }
  })
});


httpServer.listen(5000);

