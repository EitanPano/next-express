import { Request, Response, NextFunction } from 'express'
import logger from '../services/logger.service';

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  // console.log('user session??? line 4',req.session)
  if (!req.session || !req.session.user) {
    res.status(401).end('Not authenticated, Please Login')
    return
  }
  next()
}

async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.session.user
  if (user && !user.isAdmin) {
    logger.warn(user.email + ' Attempt to perform admin action')
    res.status(403).end('Unauthorized Enough..')
    return
  }
  next()
}



// module.exports = {
//   requireAuth,
//   requireAdmin
// }

export {
  requireAuth,
  requireAdmin
}