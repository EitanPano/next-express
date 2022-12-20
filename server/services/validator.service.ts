import logger from './logger.service';
import Ajv from 'ajv';
import addFormats from "ajv-formats"

const validateData = (data: any, path: string) => {
    const endPoint = _getEndPoint(path);
    const ajv = new Ajv({
        allErrors: true,
        useDefaults: true,
        removeAdditional: 'all',
    });
    addFormats(ajv)

    const schema = _getSchema(endPoint)
    if (!schema) {
        logger.warn('End-point not found: ', endPoint);
        throw new Error('Invalid Endpoint');
    }
    const validate = ajv.compile(schema)
    const isValid = validate(data)

    if (!isValid) {
        logger.warn('Invalid data inserted, Check for the required fields.');
        return false;
    }

    return true;
}

const _getEndPoint = (path: string) => {
    const startIdx = path.indexOf("/", 1);
    const endIdx = path.indexOf("/", startIdx + 1);
    const endPoint = path.substring(startIdx + 1, endIdx);
    logger.info('endPoint: ', endPoint)
    return endPoint
};

const _getSchema = (model: string) => {
    switch (model) {
        case 'auth':
            return userSchema
        case 'review':
            return reviewSchema

        default: return null;
    }
}

const userSchema = {
    type: 'object',
    properties: {
        fullName: { type: 'string', default: '' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        isAdmin: { type: 'boolean', default: false },
        points: { type: 'number', default: 10 },
        reviewCount: { type: 'number', default: 0 },
    },
    required: ['email', 'username', 'password'],
}

const reviewSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        productId: { type: 'string' },
        title: { type: 'string' },
        rating: { type: 'number' },
        description: { type: 'string', default: '' },
        createdAt: { type: 'number', default: Date.now() },
    },
    required: ['userId', 'productId', 'title', 'rating'],
}


export { validateData };
