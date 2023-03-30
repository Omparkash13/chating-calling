import io from 'socket.io-client';
import React, { createContext } from 'react';

var connectionOptions = {
  transports: ['websocket'],
  reConnect: true,
};
export const socketIo = io;
export const socket = io.connect('http://10.1.4.88:3002', connectionOptions);
const SocketContext = createContext();

export { SocketContext };
