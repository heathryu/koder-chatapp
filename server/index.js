const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('connected');

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3001, () => {
  console.log('listening on 3001');
});
