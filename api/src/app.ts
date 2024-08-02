import express from 'express';
import 'colors';
import { FRONTEND_URL, PORT } from './config/serverConfig';
import apiRoutes from './routes/index';
import errorHandler from "./middlewares/error-handler";
import cors from 'cors';
import { Socket } from 'socket.io';
import { Chat, Message, User } from '@prisma/client';
import { getChat } from './utils/chat-utils';

const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: FRONTEND_URL
    }));
    app.use('/api', apiRoutes);
    app.use(errorHandler);
    app.get('/', (req, res) => res.send(`<h1>CollegeConnect Backend is up and running</h1>`));

    const server = app.listen(PORT, async () => {
        console.log(`[LOG] : CollegeConnect Backend is listening on port ${PORT}`.green.bold);
    });

    const io = require('socket.io')(server, {
        pingTimeout: 60000,
        cors: {
            origin: FRONTEND_URL,
        }
    });

    io.on('connection', (socket: Socket) => {
        socket.on('setup', (userData: User) => {
            if (!userData) return;
            socket.join(userData.id.toString());
            socket.emit('connected');
        });

        socket.on('join chat', (room) => {
            console.log(`User joined room: ${room}`);
            socket.join(room);
        });

        socket.on('new message', async (message) => {
            let chat = await getChat(message.chatId);
            if (!chat?.users) return;

            chat?.users.forEach((user) => {
                if (user.id === message.senderId) return;

                socket.in(user.id.toString()).emit('message received', { message, chat });
            });
        });
    });
}

setupAndStartServer();
