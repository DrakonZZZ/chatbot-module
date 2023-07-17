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
let responseTimeout;

const chatLog = {};

io.on('connection', (socket) => {
  console.log('a new client has connected');
  const idExists = socket.handshake.query.id;
  let clientId;

  if (idExists) {
    clientId = idExists;
    const chatExists = chatLog[idExists];

    if (chatExists) {
      socket.emit('CHAT_EXISTS', chatExists);
    }
  } else {
    console.log('second');
    const newClientId = uuid();
    socket.emit('ID_ASSIGNMENT', newClientId);

    clientId = newClientId;
    console.log(clientId);
    setTimeout(() => {
      const welcomeMessage = {
        name: 'john doe',
        sender: 'nonuser',
        text: 'hi there',
        time: new Date(),
      };
      chatLog[newClientId] = [welcomeMessage];
      socket.emit('WELCOME', welcomeMessage);
    }, randomResponse(1500, 5000));
  }

  socket.on('MARK_READ', () => {
    chatLog[clientId] = (chatLog[clientId] || []).map((m) => ({
      ...m,
      isRead: false,
    }));
  });

  socket.on('NEW_MESSAGE', (message) => {
    chatLog[clientId] = chatLog[clientId]
      ? chatLog[clientId].concat(message)
      : [message];
    setTimeout(() => {
      socket.emit('MESSAGE_READ');
    }, randomResponse(3000, 4000));

    setTimeout(() => {
      socket.emit('TYPING');
    }, randomResponse(4000, 5000));

    if (responseTimeout) {
      clearTimeout(responseTimeout);
    }

    responseTimeout = setTimeout(() => {
      const nonuser = {
        name: 'john',
        sender: 'nonuser',
        text: 'Let me you hook you up with our online technician',
        time: new Date(),
      };
      socket.emit('NEW_MESSAGE', nonuser);
      chatLog[clientId].push(nonuser);
      responseTimeout = undefined;
    }, randomResponse(5000, 6000));
  });

  socket.on('disconnect', () => {
    console.log('The client has disconnected');
  });
});

server.listen(8080, () => {
  console.log('server is listening in port 8080');
});
