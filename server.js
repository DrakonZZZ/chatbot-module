import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
});

const randomResponse = (min, max) => {
  return Math.random() * (min - max) + min;
};

const chatLog = {};

io.on('connection', (socket) => {
  console.log('a new client has connected');
  const idExists = socket.handshake.query.id;
  let clientId;

  console.log(idExists);
  if (idExists) {
    clientId = idExists;
    const chatExists = chatLog[idExists];

    if (chatExists) {
      console.log('existing client as joined');
      socket.emit('CHAT_EXISTS', chatExists);
    }
  } else {
    console.log('second');
    const newClientId = uuid();
    clientId = newClientId;
    socket.emit('ID_ASSIGNMENT', clientId);

    setTimeout(() => {
      const welcomeMessage = {
        name: 'john doe',
        status: false,
        sender: 'nonuser',
        text: 'hi there',
        time: new Date(),
      };
      chatLog[newClientId] = [welcomeMessage];
      socket.emit('WELCOME', welcomeMessage);
    }, randomResponse(1500, 5000));
  }

  socket.on('USER_MESSAGE', (message) => {
    chatLog[clientId] = chatLog[clientId]
      ? chatLog[clientId].concat(message)
      : [message];
    setTimeout(() => {
      socket.emit('MESSAGE_READ');
    }, randomResponse(3000, 4000));

    setTimeout(() => {
      socket.emit('TYPING');
    }, randomResponse(4000, 6000));

    setTimeout(() => {
      const nonuser = {
        name: 'john',
        sender: 'nonuser',
        text: 'Let me you hook you up with our online technician',
        time: new Date(),
      };
      socket.emit('USER_MESSAGE', nonuser);
      chatLog[clientId].push(nonuser);
      console.log(chatLog);
    }, randomResponse(6000, 7000));
  });

  socket.on('disconnect', () => {
    console.log('The client has disconnected');
  });
});

server.listen(8080, () => {
  console.log('server is listening in port 8080');
});
