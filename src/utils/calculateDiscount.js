export function calculateDiscount(originalPrice, currentPrice) {
  const orig = Number(originalPrice);
  const curr = Number(currentPrice);
  if (!orig || orig <= curr || curr < 0) return 0;
  return Math.round(((orig - curr) / orig) * 100);
}

export function calculateSavings(originalPrice, currentPrice, quantity = 1) {
  const orig = Number(originalPrice) || 0;
  const curr = Number(currentPrice) || 0;
  if (orig <= curr) return 0;
  return Number(((orig - curr) * quantity).toFixed(2));
}

export default calculateDiscount;