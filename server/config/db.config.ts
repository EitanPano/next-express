export const dbURL = process.env.NODE_ENV === 'production'
    ? process.env.DB_URL!
    : "mongodb://127.0.0.1:27017";

export const dbName = process.env.NODE_ENV === 'production'
    ? process.env.DB_NAME!
    : "playground"