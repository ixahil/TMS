import { Router } from 'express';
import { booking } from '../controllers/booking/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

// Admin Routes
router.post('/', authenticate(['ADMIN', 'USER', 'AGENT']), booking.create);
router.get('/user', authenticate(['USER']), booking.getUserBookings);
router.get('/user/:id', authenticate(['USER']), booking.getUserBookingById);

// Auth
router.get('/', authenticate(['ADMIN', 'AGENT']), booking.getAll);
router.get('/:id', authenticate(['ADMIN', 'AGENT']), booking.get);

export const bookingRouter = router;
