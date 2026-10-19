import * as service from '../services/customerService.js';
import {asyncHandler} from '../utils/asyncHandler.js';
export const list=asyncHandler(async(req,res)=>res.json({success:true,data:await service.listCustomers(req.user._id,String(req.query.search||'').slice(0,100))}));
export const create=asyncHandler(async(req,res)=>res.status(201).json({success:true,data:await service.createCustomer(req.user._id,req.body)}));
export const update=asyncHandler(async(req,res)=>res.json({success:true,data:await service.updateCustomer(req.user._id,req.params.id,req.body)}));
export const remove=asyncHandler(async(req,res)=>{await service.deleteCustomer(req.user._id,req.params.id);res.json({success:true,message:'Customer deleted'});});
