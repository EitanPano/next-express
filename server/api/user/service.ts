import dbService from '../../services/db.service';
import { ObjectId } from 'mongodb';
import logger from '../../services/logger.service';
import asyncLocalStorage from '../../services/als.service';



async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('user');
        let users = await collection.find(criteria).toArray();
        // users = users.map((user) => {
        // delete user.password;
        // user.createdAt = ObjectId(user._id).getTimestamp();
        // Returning fake fresh data
        // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        // return user;
        // });
        return users;
    } catch (err: any) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId: string) {
    try {
        const collection = await dbService.getCollection('user');
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        delete user!.password;

        return user;
    } catch (err: any) {
        logger.error(`while finding user ${userId}`, err);
        throw err;
    }
}

async function getByName(name: string) {
    try {
        const usernameQuery = { username: { '$regex': `^${name}$`, '$options': 'i' } }
        const emailQuery = { email: { '$regex': `^${name}$`, '$options': 'i' } }
        const query = { "$or": [usernameQuery, emailQuery] }

        const collection = await dbService.getCollection('user');
        const user = await collection.findOne(query);

        return user;
    } catch (err: any) {
        logger.error(`while finding user ${name}`, err);
        throw err;
    }
}

async function add(user: any) {
    try {
        const collection = await dbService.getCollection('user');
        const { insertedId } = await collection.insertOne(user);

        return { ...user, _id: insertedId };
    } catch (err: any) {
        logger.error('cannot insert user', err);
        throw err;
    }
}

async function update(user: any) {
    try {
        // Pick only updatable fields!
        const _id = new ObjectId(user._id);
        const collection = await dbService.getCollection('user');
        await collection.updateOne({ _id }, { $set: { ...user } });

        return user;
    } catch (err: any) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function remove(userId: string) {
    const { loggedUserId, isAdmin } = asyncLocalStorage.getStore();
    logger.debug('compare', loggedUserId , userId);
    if (loggedUserId !== userId || !isAdmin) return Promise.reject('Not Authorized')
    
    try {
        const _id = new ObjectId(userId)
        const collection = await dbService.getCollection('user');
        await collection.deleteOne({ _id });
    } catch (err: any) {
        logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy: any) {
    const criteria = {};
    // if (filterBy.txt) {
    //     const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
    //     criteria.$or = [
    //         {
    //             username: txtCriteria,
    //         },
    //         {
    //             fullname: txtCriteria,
    //         },
    //     ];
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: filterBy.minBalance };
    // }
    return criteria;
}

export const userService = { query, getById, getByName, add, update, remove }
