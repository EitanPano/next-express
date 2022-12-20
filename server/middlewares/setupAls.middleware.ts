// import logger from '../services/logger.service'
import asyncLocalStorage from '../services/als.service'
import { Request, Response, NextFunction } from 'express'

// I Don't know why removing this makes errors
import {iSession} from '../config/session.config'
import { Admin } from '../models/User.model'

async function setupAsyncLocalStorage(req: Request, res: Response, next: NextFunction) {
    const storage = {}
    asyncLocalStorage.run(storage, () => {
        if (req.sessionID) {
            const alsStore = asyncLocalStorage.getStore()
            const session = (req.session as iSession)
            alsStore.sessionId = req.sessionID
            if (session.user) {
                alsStore.loggedUserId = session.user._id
                alsStore.isAdmin = (session.user as Admin).isAdmin
            }
        }
        next()
    })
}

export default setupAsyncLocalStorage

