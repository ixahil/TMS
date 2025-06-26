import { Router } from 'express';
import tours from '../controllers/tour/tour.controller';
const router = Router();

// public
router.get('/', tours.getAllTours);
router.get('/featured', tours.getAllFeaturedTours);
router.get('/international', tours.getAllInternationTours);
router.get('/top', tours.topDestinations);
router.get('/cities-states', tours.getCitiesNStates);
router.get('/:id', tours.getTourById);

export const tourRouter = router;
