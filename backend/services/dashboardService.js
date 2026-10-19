import Purchase from '../models/Purchase.js';
import Customer from '../models/Customer.js';
import { calculateRFM } from './rfmService.js';
export async function getDashboard(owner) {
 const [customerCount,purchases,rfm]=await Promise.all([Customer.countDocuments({owner}),Purchase.find({owner}).sort({purchasedAt:-1}).populate('customer','name').lean(),calculateRFM(owner)]);
 const totalSales=purchases.reduce((s,p)=>s+p.amount,0);
 const repeatCustomers=rfm.filter(r=>r.frequency>1).length;
 const segmentCounts=rfm.reduce((acc,r)=>{acc[r.segment]=(acc[r.segment]||0)+1;return acc;},{});
 const topCustomers=[...rfm].sort((a,b)=>b.monetary-a.monetary).slice(0,5).map(r=>({id:r.customer._id,name:r.customer.name,monetary:r.monetary,frequency:r.frequency,segment:r.segment}));
 return {stats:{totalCustomers:customerCount,totalPurchases:purchases.length,totalSales:Math.round(totalSales*100)/100,repeatCustomers},segmentCounts,topCustomers,recentPurchases:purchases.slice(0,6)};
}
