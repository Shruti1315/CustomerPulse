import {Router} from 'express'; import {list,create,remove} from '../controllers/purchaseController.js';
const router=Router(); router.route('/').get(list).post(create); router.delete('/:id',remove); export default router;
