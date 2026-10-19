import {registerUser,loginUser} from '../services/authService.js';
import {asyncHandler} from '../utils/asyncHandler.js';
export const register=asyncHandler(async(req,res)=>res.status(201).json({success:true,data:await registerUser(req.body)}));
export const login=asyncHandler(async(req,res)=>res.json({success:true,data:await loginUser(req.body)}));
export const me=asyncHandler(async(req,res)=>res.json({success:true,data:{user:{id:req.user._id,name:req.user.name,businessName:req.user.businessName,email:req.user.email}}}));
