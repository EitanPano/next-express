// import dbService from '../../services/db.service';
// import { ObjectId } from 'mongodb';
import { User } from '../../models/User.model';
import logger from '../../services/logger.service';



async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    try {
        // const collection = await dbService.getCollection('user');
        // var users = await collection.find(criteria).toArray();
        // users = users.map((user) => {
        //     delete user.password;
        //     user.createdAt = ObjectId(user._id).getTimestamp();
        // Returning fake fresh data
        // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        // return user;
        // });
        const users = [{_id: 'u12345', username: 'Mottielz33', email: 'motiel90@fakemail.com', password: 'aTestPassword' }];
        return users;
    } catch (err: any) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId: string) {
    try {
        // const collection = await dbService.getCollection('user');
        // const user = await collection.findOne({ _id: ObjectId(userId) });
        // delete user.password;
        const user = {_id: 'u12345', username: 'Mottielz33', email: 'motiel90@fakemail.com', password: 'aTestPassword' };
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

        // const collection = await dbService.getCollection('user');
        // const user = await collection.findOne(query);
        const user = { _id: 'u12345', username: 'Mottielz33', email: 'motiel90@fakemail.com', password: 'aTestPassword' };

        return user;
    } catch (err: any) {
        logger.error(`while finding user ${name}`, err);
        throw err;
    }
}
// const user = await collection.findOne({ "or": [{username: name}, {email: name}] });

async function add(userCreds: any) {
    try {
        // const collection = await dbService.getCollection('user');
        // console.log(userCreds);
        // const user = await collection.insertOne(userCreds);
        const user: User = { _id: 'u12345', username: 'Mottielz33', email: 'motiel90@fakemail.com', password: 'aTestPassword' };

        return user;
    } catch (err: any) {
        logger.error('cannot insert user', err);
        throw err;
    }
}

async function update(user: any) {
    try {
        // peek only updatable fields!
        // const _id = ObjectId(user._id);
        // const collection = await dbService.getCollection('user');
        // await collection.updateOne({ _id }, { $set: { ...user } });
        const user = { _id: 'u12345', username: 'Mottielz33', email: 'motiel90@fakemail.com', password: 'aTestPassword' };

        return user;
    } catch (err: any) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function remove(userId: string) {
    try {
        // const collection = await dbService.getCollection('user');
        // await collection.deleteOne({ _id: ObjectId(userId) });
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
