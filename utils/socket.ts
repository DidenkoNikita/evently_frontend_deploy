import { io } from 'socket.io-client';

const url = process.env.CONNECT;

export const socket = io(String(url));