import mongoose from 'mongoose';
const purchaseSchema = new mongoose.Schema({
  owner: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true },
  customer: { type:mongoose.Schema.Types.ObjectId, ref:'Customer', required:true, index:true },
  amount: { type:Number, required:true, min:0.01 },
  purchasedAt: { type:Date, required:true, default:Date.now },
  description: { type:String, trim:true, default:'', maxlength:200 },
  reference: { type:String, trim:true, default:'' }
}, { timestamps:true });
purchaseSchema.index({ owner:1, purchasedAt:-1 });
export default mongoose.model('Purchase', purchaseSchema);
