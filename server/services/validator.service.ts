import logger from './logger.service';
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import addErrors from 'ajv-errors';

const validateData = (data: any, path: string) => {
    const endPoint = _getEndPoint(path);
    const ajv = new Ajv({
        allErrors: true,
        useDefaults: true,
        removeAdditional: 'all',
    });
    addFormats(ajv);
    addErrors(ajv);

    const schema = _getSchema(endPoint);
    if (!schema) {
        logger.error('End-point not found: ', endPoint);
        throw new Error('Invalid Endpoint');
    }
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    const errors: any = []
    if (!isValid && validate.errors) {
        validate.errors.forEach(error => {
            const field = error.instancePath.substring(1, error.instancePath.length)
            const properties: any = []

            console.log(validate.errors);


            error.params.errors.forEach((err: any) => {
                const type = err.keyword;
                let msg: string;
                if (field === 'password' && type === 'pattern') msg = error.message!;
                else if (field === 'email' && type === 'format') msg = error.message!;
                else msg = err.message;
                properties.push({ type, msg })
            })

            errors.push({ field, properties })
        })
    }

    return { isValid, errors };
}

const _getEndPoint = (path: string) => {
    const startIdx = path.indexOf("/", 1);
    const endIdx = path.indexOf("/", startIdx + 1);
    const endPoint = path.substring(startIdx + 1, endIdx);
    logger.debug('endPoint', endPoint);
    return endPoint;
};

const _getSchema = (model: string) => {
    switch (model) {
        case 'auth':
            return userSchema;
        case 'review':
            return reviewSchema;

        default: return null;
    }
}

const userSchema = {
    type: 'object',
    properties: {
        fullName: { type: 'string', default: '' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8, maxLength: 16, pattern: "^(?=.*?[a-z])(?=.*?[A-Z])((?=.*?[0-9])|(?=.*?[+!?@#$%^&*-])).{8,16}$" },
        // isAdmin: { type: 'boolean', default: false },
    },
    required: ['email', 'username', 'password'],
    errorMessage: {
        properties: {
            email: 'Email should look like <example@email.com>.',
            password: 'Password requires minimum 1 Lowercase, 1 Uppercase, and 1 Digit or Special-Character'
        },
    },
};

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
};


export { validateData };
