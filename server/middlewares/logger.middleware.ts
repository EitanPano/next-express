import logger from '../services/logger.service';
import { Request, Response, NextFunction } from 'express';

async function log(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
        logger.info('Req from: ' + req.session.user.email);
    }
    next();
}

export { log };
