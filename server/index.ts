import dotenv from 'dotenv';
import next from 'next';
import runServer from './server';

dotenv.config()

const app = next({
    dev: process.env.NODE_ENV !== 'production',
    hostname: process.env.HOSTNAME,
    port: +process.env.PORT! || 3000,
})

const handleClient = app.getRequestHandler()
app.prepare().then(() => runServer(handleClient))