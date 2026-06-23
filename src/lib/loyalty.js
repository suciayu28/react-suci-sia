export const tierDiscount = {
  bronze: 0.05,
  silver: 0.1,
  gold: 0.15,
  platinum: 0.2,
};

export function calculateDiscountedTotal(amount, tier) {
  const discount = tierDiscount[tier] ?? 0;
  return Number(amount) - Number(amount) * discount;
}

export function calculatePoints(totalAfterDiscount) {
  return Math.floor(Number(totalAfterDiscount) / 10000);
}

export function calculateTier(points) {
  if (points > 1000) return "platinum";
  if (points > 500) return "gold";
  if (points > 100) return "silver";
  return "bronze";
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}
