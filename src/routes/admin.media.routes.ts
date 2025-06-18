import { Router } from 'express';
import { media } from '../controllers/media/media.controller';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

// Admin Routes
router.post('/', authenticate(['ADMIN']), media.uploadMedia);
router.get('/', authenticate(['ADMIN']), media.getAllMedia);
router.delete('/:id', authenticate(['ADMIN']), media.deleteMedia);
router.post('/bulk-delete', authenticate(['ADMIN']), media.deleteMediaBulk);

export const adminMediaRouter = router;
