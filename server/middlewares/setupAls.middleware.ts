// import logger from '../services/logger.service'
import asyncLocalStorage from '../services/als.service'
import { Request, Response, NextFunction } from 'express'

async function setupAsyncLocalStorage(req: Request, res: Response, next: NextFunction) {
    const storage = {}
    asyncLocalStorage.run(storage, () => {
        if (req.sessionID) {
            const alsStore = asyncLocalStorage.getStore()
            alsStore.sessionId = req.sessionID
            if (req.session.user) {
                alsStore.userId = req.session.user._id
                alsStore.isAdmin = req.session.user.isAdmin
            }
        }
        next()
    })
}

export default setupAsyncLocalStorage

