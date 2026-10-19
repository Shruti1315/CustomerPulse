import mongoose from 'mongoose';
const campaignSchema = new mongoose.Schema({
  owner: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true },
  name: { type:String, required:true, trim:true, maxlength:120 },
  segment: { type:String, required:true, enum:['Champions','Loyal Customers','Potential Loyalists','At Risk','Inactive','Regular'] },
  message: { type:String, required:true, trim:true, maxlength:1000 },
  status: { type:String, enum:['Draft','Ready','Sent'], default:'Draft' }
}, { timestamps:true });
export default mongoose.model('Campaign', campaignSchema);
