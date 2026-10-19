import Purchase from '../models/Purchase.js';
import Customer from '../models/Customer.js';
import AppError from '../utils/AppError.js';
export async function listPurchases(owner) { return Purchase.find({owner}).populate('customer','name email').sort({purchasedAt:-1}).lean(); }
export async function createPurchase(owner,data) {
 const amount=Number(data.amount), purchasedAt=new Date(data.purchasedAt || Date.now());
 if(!data.customer) throw new AppError('Choose a customer');
 if(!Number.isFinite(amount) || amount<=0) throw new AppError('Purchase amount must be greater than zero');
 if(Number.isNaN(purchasedAt.getTime())) throw new AppError('Enter a valid purchase date');
 if(purchasedAt > new Date()) throw new AppError('Purchase date cannot be in the future');
 const customer=await Customer.findOne({_id:data.customer,owner}); if(!customer) throw new AppError('Customer not found',404);
 return Purchase.create({owner,customer:data.customer,amount,purchasedAt,description:data.description||''});
}
export async function deletePurchase(owner,id) { const p=await Purchase.findOneAndDelete({_id:id,owner}); if(!p) throw new AppError('Purchase not found',404); return p; }
