import { Router } from 'express';
import tours from '../controllers/tour/tour.controller';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

// ADMIN Routes
router.get('/', authenticate(['ADMIN']), tours.getAllTours);

router.post('/new', authenticate(['ADMIN']), tours.createTour);
router.post('/:id', authenticate(['ADMIN']), tours.updateTour);
router.post('/status/:id', authenticate(['ADMIN']), tours.updateTourStatus);
router.delete('/:id', authenticate(['ADMIN']), tours.deleteTour);

export const adminTourRouter = router;
