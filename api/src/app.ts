import express from 'express';
import 'colors';
import {PORT} from './config/serverConfig';
import apiRoutes from './routes/index';
import errorHandler from "./middlewares/error-handler";

const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api',apiRoutes);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`[LOG] : CollegeConnect Backend is listening on port ${PORT}`.green.bold);
    });
    app.get('/', (req, res) => res.send(`<h1>CollegeConnect Backend is up and running</h1>`));
}

setupAndStartServer();
