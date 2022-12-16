import expressSession from 'express-session';
import { User } from '../models/User.model';

declare module "express-session" {
    interface SessionData {
        user: User;
    }
}

const session = expressSession({
    secret: 'I Love Coding',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});

export default session;