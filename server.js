import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a new client has connected');

  setTimeout(() => {
    socket.emit('WELCOME', {
      id: Math.random() * 10,
      name: 'john',
      status: 'unread',
      sender: 'nonuser',
      text: 'hi there',
      time: new Date(),
    });
  }, 6000);

  socket.on('USER_MESSAGE', (message) => {
    setTimeout(() => {
      socket.emit('USER_MESSAGE', {
        id: Math.random() * 10,
        name: 'john',
        sender: 'nonuser',
        text: 'Let me you hook you up with our online technician',
        time: new Date(),
      });
    }, 3000);
  });

  socket.on('disconnect', () => {
    console.log('The client has disconnected');
  });
});

server.listen(8080, () => {
  console.log('server is listening in port 8080');
});
