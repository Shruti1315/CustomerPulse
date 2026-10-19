import {Router} from 'express'; import {rfm,dashboard} from '../controllers/analyticsController.js';
const router=Router(); router.get('/rfm',rfm); router.get('/dashboard',dashboard); export default router;
