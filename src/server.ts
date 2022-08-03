import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.json({ msg: 'App working successfully' });
});

io.on('connection', (socket: Socket) => {
  console.log('Connected to socket.io server successfully');
});

const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/trelloDB').then(() => {
  console.log('Connect to mongodb server successfully');
  httpServer.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
});
