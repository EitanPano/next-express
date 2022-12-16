import { Request, Response } from 'express'
import { authService } from './service';
import logger from '../../services/logger.service';

async function signUp(req: Request, res: Response) {
    try {
        const newUser = req.body;
        newUser.isAdmin = false
        // console.log(newUser);
        const user = await authService.signUp(newUser);
        req.session.user = user
        res.json(user);
        // console.log('user: ', user);
    } catch (err: any) {
        logger.error('Failed to create a new user', err);
        res.status(500).send({ err: 'Failed to sign-up.' });
    }
}

async function logIn(req: Request, res: Response) {
    try {
        const userCreds = req.body;
        const user = await authService.logIn(userCreds);
        req.session.user = user
        res.json(user);
    } catch (err: any) {
        logger.error('Failed to log-in', err);
        res.status(500).send({ err: 'Log-In failed, check input fields.' });
    }
}

async function logOut(req: Request, res: Response) {
    try {
        req.session.destroy((err) => {

        })
        // req.session.user = null;
        res.send({ msg: 'Logged out successfully' })
    } catch (err: any) {
        // logger.error('Failed to log-out', err);
        res.status(500).send({ err: 'Failed to log-out' });
    }
}

export { signUp, logIn, logOut };