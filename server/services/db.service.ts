import logger from './logger.service';
import { dbURL, dbName } from '../config/db.config';
import { Db, MongoClient } from 'mongodb';

const dbService = {
    getCollection
}

let dbConn: null | Db = null;
export async function getCollection(collectionName: string) {
    try {
        const db = await _connect();
        const collection = db.collection(collectionName);
        return collection;
    } catch (err) {
        logger.error('Failed to get Mongo collection', err);
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(dbURL);
        const db = client.db(dbName);
        dbConn = db;

        logger.info(`MongoDB Connected: ${db.namespace}`);
        return db;
    } catch (err) {
        logger.error('Cannot Connect to DB', err);
        throw err;
    }
}

export default dbService;
