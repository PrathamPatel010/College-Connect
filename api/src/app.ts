import express from 'express';
import 'colors';
import {PORT} from './config/serverConfig';
import prisma from './config/dbConfig';
const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(PORT, () => {
        console.log(`[LOG] : CollegeConnect Backend is listening on port ${PORT}`.green.bold);
    });
    const user = await prisma.user.create({
        data:{
            email: 'pratham@google.com',
            username: 'pratham',
            password: 'coder'
        }
    });
    console.log(user);
    app.get('/', (req, res) => res.send(`<h1>CollegeConnect Backend is up and running</h1>`));
}

setupAndStartServer();
