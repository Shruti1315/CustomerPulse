import Customer from '../models/Customer.js';
import Purchase from '../models/Purchase.js';

// Quintile scoring based on the current dataset. Recency is reversed: fewer days = better score.
function quintile(value, values, reverse=false) {
  if (!values.length) return 1;
  const sorted = [...values].sort((a,b)=>a-b);
  let rank = sorted.filter(v => v <= value).length / sorted.length;
  let score = Math.min(5, Math.max(1, Math.ceil(rank * 5)));
  return reverse ? 6 - score : score;
}
export function classifySegment(r, f, m, daysSincePurchase) {
  if (daysSincePurchase > 180) return 'Inactive';
  if (r >= 4 && f >= 4 && m >= 4) return 'Champions';
  if (f >= 4 && r >= 3) return 'Loyal Customers';
  if (r >= 4 && f <= 2) return 'Potential Loyalists';
  if (r <= 2 && (f >= 3 || m >= 3)) return 'At Risk';
  return 'Regular';
}
export function actionForSegment(segment) {
  const actions = {
    'Champions':'Reward their loyalty with early access, a thank-you offer, or a referral reward.',
    'Loyal Customers':'Offer a loyalty reward or bundle to encourage their next purchase.',
    'Potential Loyalists':'Encourage a second or third purchase with a relevant welcome offer.',
    'At Risk':'Reach out with a personal check-in and a time-limited win-back offer.',
    'Inactive':'Try a win-back campaign and review whether the customer is still active.',
    'Regular':'Share relevant products and a small incentive to build repeat-purchase habits.'
  };
  return actions[segment] || actions.Regular;
}
export async function calculateRFM(ownerId) {
  const [customers, purchases] = await Promise.all([
    Customer.find({ owner:ownerId }).lean(),
    Purchase.find({ owner:ownerId }).sort({ purchasedAt:1 }).lean()
  ]);
  const byCustomer = new Map();
  for (const p of purchases) {
    const key = String(p.customer);
    if (!byCustomer.has(key)) byCustomer.set(key, { count:0, total:0, last:null });
    const row = byCustomer.get(key); row.count += 1; row.total += p.amount;
    if (!row.last || p.purchasedAt > row.last) row.last = p.purchasedAt;
  }
  const now = new Date();
  const rows = customers.map(c => {
    const p = byCustomer.get(String(c._id)) || {count:0,total:0,last:null};
    const days = p.last ? Math.max(0, Math.floor((now - new Date(p.last))/86400000)) : null;
    return { customer:c, recencyDays:days, frequency:p.count, monetary:Math.round(p.total*100)/100 };
  });
  const active = rows.filter(r => r.frequency > 0);
  const recencies = active.map(r=>r.recencyDays), frequencies=active.map(r=>r.frequency), monetaries=active.map(r=>r.monetary);
  return rows.map(r => {
    if (!r.frequency) return {...r, recencyScore:1, frequencyScore:1, monetaryScore:1, rfmScore:'111', segment:'Inactive', recommendation:actionForSegment('Inactive')};
    const rs=quintile(r.recencyDays, recencies, true), fs=quintile(r.frequency, frequencies), ms=quintile(r.monetary, monetaries);
    const segment=classifySegment(rs,fs,ms,r.recencyDays);
    return {...r, recencyScore:rs, frequencyScore:fs, monetaryScore:ms, rfmScore:`${rs}${fs}${ms}`, segment, recommendation:actionForSegment(segment)};
  });
}
