import { Router } from 'express';
import userController from '../controllers/user/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public
router.get('/logout', userController.logout);

// Admin Only
router.get('/agents', authenticate(['ADMIN']), userController.getAgents);
router.get('/users', authenticate(['ADMIN']), userController.getUsers);
router.post(
  '/status/:id',
  authenticate(['ADMIN']),
  userController.updateUserStatus,
);
router.delete('/:id', authenticate(['ADMIN']), userController.getUsers);

// All Routes
router.post(
  '/update/:id',
  authenticate(['ADMIN', 'USER', 'AGENT']),
  userController.updateProfile,
);

router.get(
  '/me',
  authenticate(['ADMIN', 'USER', 'AGENT']),
  userController.getMe,
);

router.get(
  '/:id',
  authenticate(['ADMIN', 'USER', 'AGENT']),
  userController.getActiveUser,
);

export const userRouter = router;
