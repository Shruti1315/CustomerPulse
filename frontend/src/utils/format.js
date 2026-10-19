export const money=(value)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(value)||0);
export const shortDate=(value)=>value?new Date(value).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'—';
export const errorMessage=(error)=>error.response?.data?.message||error.message||'Something went wrong';
