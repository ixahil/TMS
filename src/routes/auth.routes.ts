import { Router } from 'express';
import {
  login,
  register,
  resendVerification,
  verifyOTP,
} from '../controllers/auth/auth.controller';
const router = Router();

// Admin Routes
router.post('/admin/register', register('ADMIN'));
router.post('/admin/login', login(['ADMIN']));

// Agent Routes
router.post('/agents/register', register('AGENT'));
router.post('/agents/login', login(['AGENT']));

// User Routes
router.post('/users/register', register('USER'));
router.post('/users/login', login(['USER']));

// OTP Verifciation/Resend after registration
router.post('/verify', verifyOTP);
router.post('/resend-verification', resendVerification);

export const authRouter = router;
