import { Router } from 'express';
import tours from '../controllers/tour/tour.controller';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

// Agent Routes
router.get('/', authenticate(['AGENT']), tours.getAllToursByAgent);

router.post('/new', authenticate(['AGENT']), tours.createTour);
router.post('/:id', authenticate(['AGENT']), tours.updateTour);
router.delete('/:id', authenticate(['AGENT']), tours.deleteTour);

export const agentTourRouter = router;
