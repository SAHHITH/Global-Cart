export function formatPrice(amount, currency = 'INR', locale = 'en-IN') {
  const numeric = Number(amount) || 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: numeric % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value) || 0);
}

export default formatPrice;
