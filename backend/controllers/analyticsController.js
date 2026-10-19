import {calculateRFM} from '../services/rfmService.js';
import {getDashboard} from '../services/dashboardService.js';
import {asyncHandler} from '../utils/asyncHandler.js';
export const rfm=asyncHandler(async(req,res)=>res.json({success:true,data:await calculateRFM(req.user._id)}));
export const dashboard=asyncHandler(async(req,res)=>res.json({success:true,data:await getDashboard(req.user._id)}));
