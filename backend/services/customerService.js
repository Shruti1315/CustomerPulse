import Customer from '../models/Customer.js';
import AppError from '../utils/AppError.js';
export async function listCustomers(owner, search='') {
 const query={owner}; if(search) query.$or=[{name:{$regex:search,$options:'i'}},{email:{$regex:search,$options:'i'}},{phone:{$regex:search,$options:'i'}}];
 return Customer.find(query).sort({createdAt:-1}).lean();
}
export async function createCustomer(owner, data) {
 if(!data.name?.trim()) throw new AppError('Customer name is required');
 return Customer.create({owner,name:data.name,email:data.email||'',phone:data.phone||'',notes:data.notes||''});
}
export async function updateCustomer(owner,id,data) {
 const customer=await Customer.findOneAndUpdate({_id:id,owner},{$set:{name:data.name,email:data.email,phone:data.phone,notes:data.notes}},{new:true,runValidators:true});
 if(!customer) throw new AppError('Customer not found',404); return customer;
}
export async function deleteCustomer(owner,id) {
 const customer=await Customer.findOneAndDelete({_id:id,owner}); if(!customer) throw new AppError('Customer not found',404);
 const Purchase= (await import('../models/Purchase.js')).default; await Purchase.deleteMany({owner,customer:id}); return customer;
}
