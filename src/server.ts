import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import globalError from './middlewares/globalError';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Global middlewares
app.use(express.json());
// routes
app.use('/api/v1/users', userRouter);

// Global error handling middleware for express
app.use(globalError);

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
