import { createServer } from 'http';
import express from 'express';
import session from './config/session.config';
import logger from './services/logger.service';

import setupAsyncLocalStorage from './middlewares/setupAls.middleware';
import authRoutes from './api/auth/routes';
import userRoutes from './api/user/routes';
import { RequestHandler } from 'next/dist/server/next';


function runServer(handleClient: RequestHandler) {
    const server = express()
    createServer(server)

    server.use(express.json());
    server.use(session)

    server.all('*', setupAsyncLocalStorage);
    server.use('/api/auth', authRoutes);
    server.use('/api/user', userRoutes);

    server.get('/**', (req, res) => {
        return handleClient(req, res)
    });

    server.listen(process.env.PORT, () => {
        logger.debug(`Server running in "${process.env.NODE_ENV}" mode\n on http://localhost:${process.env.PORT}`);
    });
}

export default runServer;