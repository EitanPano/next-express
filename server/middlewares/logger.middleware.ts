import logger from '../services/logger.service';
import { Request, Response, NextFunction } from 'express';
import { iSession } from '../config/session.config'

async function log(req: Request, res: Response, next: NextFunction) {
    if (req.session && (req.session as iSession).user) {
        logger.debug('Req from: ' + req.session.user!.email);
    }
    next();
}

export { log };
