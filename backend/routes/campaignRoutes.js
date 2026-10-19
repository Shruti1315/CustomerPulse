import {Router} from 'express'; import {list,create,updateStatus} from '../controllers/campaignController.js';
const router=Router(); router.route('/').get(list).post(create); router.patch('/:id/status',updateStatus); export default router;
