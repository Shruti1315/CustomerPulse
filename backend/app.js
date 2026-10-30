import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import {protect} from './middleware/authMiddleware.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
const app=express();
app.use(async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
      throw new Error('JWT_SECRET must be at least 24 characters');
    }

    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});
app.use(helmet());
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));
app.use(express.json({limit:'1mb'}));
if(process.env.NODE_ENV!=='test') app.use(morgan('dev'));
app.use('/api',rateLimit({windowMs:15*60*1000,limit:300,standardHeaders:true,legacyHeaders:false}));
app.get('/api/health',(req,res)=>res.json({success:true,message:'CustomerPulse API is running'}));
app.use('/api/auth',authRoutes);
app.use('/api/customers',protect,customerRoutes);
app.use('/api/purchases',protect,purchaseRoutes);
app.use('/api/analytics',protect,analyticsRoutes);
app.use('/api/campaigns',protect,campaignRoutes);
app.use(notFound); app.use(errorHandler);
export default app;
