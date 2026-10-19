import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ success:false, message:'Please log in to continue' });
  let decoded;
  try { decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET); }
  catch { return res.status(401).json({ success:false, message:'Session is invalid or expired' }); }
  req.user = await User.findById(decoded.id).select('-password');
  if (!req.user) return res.status(401).json({ success:false, message:'Account not found' });
  next();
});
