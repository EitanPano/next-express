import { Request, Response } from 'express';

import { userService } from './service'
import logger from '../../services/logger.service'

async function getUsers(req: Request, res: Response) {
    try {
        const filterBy = {
            // txt: req.query?.txt || '',
            // minBalance: +req.query?.minBalance || 0,
        };
        const users = await userService.query(filterBy);
        res.send(users);
    } catch (err: any) {
        logger.error('Failed to get users', err);
        res.status(500).send({ err: 'Failed to get users' });
    }
}

async function getUserById(req: Request, res: Response) {
    try {
        const user = await userService.getById(req.params.id);
        res.send(user);
    } catch (err: any) {
        logger.error('Failed to get user', err);
        res.status(500).send({ err: 'Failed to get user' });
    }
}

async function addUser(req: Request, res: Response) {
    try {
    } catch (err: any) {
        logger.error('Failed to add user', err);
        res.status(500).send({ err: 'Failed to add user' });
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const user = req.body;
        const savedUser = await userService.update(user);
        res.send(savedUser);
    } catch (err: any) {
        logger.error('Failed to update user', err);
        res.status(500).send({ err: 'Failed to update user' });
    }
}

async function removeUser(req: Request, res: Response) {
    try {
        await userService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err: any) {
        logger.error('Failed to delete user', err);
        res.status(500).send({ err: 'Failed to delete user' });
    }
}

export {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
};
