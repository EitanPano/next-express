import expressSession, { Session } from 'express-session';
import { User } from '../models/User.model';
// import asyncLocalStorage from '../services/als.service';
import MongoStore from 'connect-mongo'
import { dbName, dbURL } from './db.config';

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

export interface iSession extends Session {
  user?: User
}

const session = expressSession({
  store: new MongoStore({ mongoUrl: dbURL, collectionName: dbName }),
  secret: 'I Love Coding',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

export default session;