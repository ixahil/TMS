import { Router } from 'express';
import { media } from '../controllers/media/media.controller';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

// Admin Routes
router.post('/', authenticate(['AGENT']), media.uploadMedia);
router.get('/', authenticate(['AGENT']), media.getAllMedia);
router.delete('/:id', authenticate(['AGENT']), media.deleteMedia);
router.post('/bulk-delete', authenticate(['AGENT']), media.deleteMediaBulk);

export const agentMediaRouter = router;
