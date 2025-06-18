import { Router } from 'express';
import tours from '../controllers/tour/tour.controller';
const router = Router();

// public
router.get('/:id', tours.getTourById);
router.get('/', tours.getAllTours);
router.get('/featured', tours.getAllFeaturedTours);
router.get('/international', tours.getAllInternationTours);
router.get('/cities-states', tours.getCitiesNStates);

export const tourRouter = router;
