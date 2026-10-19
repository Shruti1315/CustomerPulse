import * as service from '../services/purchaseService.js';
import {asyncHandler} from '../utils/asyncHandler.js';
export const list=asyncHandler(async(req,res)=>res.json({success:true,data:await service.listPurchases(req.user._id)}));
export const create=asyncHandler(async(req,res)=>res.status(201).json({success:true,data:await service.createPurchase(req.user._id,req.body)}));
export const remove=asyncHandler(async(req,res)=>{await service.deletePurchase(req.user._id,req.params.id);res.json({success:true,message:'Purchase deleted'});});
