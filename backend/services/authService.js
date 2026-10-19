import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
const createToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN || '7d'});
export async function registerUser({name,businessName,email,password}) {
  if (!name || !businessName || !email || !password) throw new AppError('Please fill in all required fields');
  if (password.length < 8) throw new AppError('Password must contain at least 8 characters');
  if (await User.exists({email:email.toLowerCase().trim()})) throw new AppError('An account with this email already exists',409);
  const user=await User.create({name,businessName,email,password});
  return {token:createToken(user._id), user:{id:user._id,name:user.name,businessName:user.businessName,email:user.email}};
}
export async function loginUser({email,password}) {
  if (!email || !password) throw new AppError('Email and password are required');
  const user=await User.findOne({email:email.toLowerCase().trim()}).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password',401);
  return {token:createToken(user._id), user:{id:user._id,name:user.name,businessName:user.businessName,email:user.email}};
}
