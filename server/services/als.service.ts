import { AsyncLocalStorage } from 'async_hooks';
const asyncLocalStorage = new AsyncLocalStorage<any>();


// The AsyncLocalStorage singleton
export default asyncLocalStorage;
