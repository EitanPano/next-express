import bcrypt from 'bcrypt';
import { userService } from '../user/service';
// import logger from '../../services/logger.service';

async function signUp(userCreds: any) {
    const saltRounds = +process.env.SALT_ROUNDS! || 10;
    const password = await bcrypt.hash(userCreds.password, saltRounds);

    return userService.add({ ...userCreds, password });
}

async function logIn({ username, password }: any) {
    const user: any = await userService.getByName(username);
    if (!user) return Promise.reject('Invalid username or password');
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return Promise.reject('Invalid username or password');

    delete user.password;
    return user;
}

export const authService = { signUp, logIn };
