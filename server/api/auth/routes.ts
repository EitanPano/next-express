import express from 'express';
import requireValidate from '../../middlewares/requireValidate.middleware';
// import { log } from '../../middlewares/logger.middleware';
// import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware';
import { signUp, logIn, logOut } from './controller';
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)


// router.get('/:name', log, getUserByName);
router.post('/signup', requireValidate , signUp)
router.post('/login', logIn)
router.post('/logout', logOut)

export default router;
