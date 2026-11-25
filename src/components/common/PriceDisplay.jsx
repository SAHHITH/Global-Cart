import { formatPrice } from '@/utils/formatPrice';
import { calculateDiscount } from '@/utils/calculateDiscount';

export function PriceDisplay({
  price,
  originalPrice,
  discount,
  size = 'md',
  showDiscountBadge = true,
  className = '',
}) {
  const computedDiscount =
    discount !== undefined ? discount : calculateDiscount(originalPrice, price);
  const hasDiscount = originalPrice && Number(originalPrice) > Number(price);

  const priceSize = {
    sm: 'text-base font-bold',
    md: 'text-lg font-extrabold',
    lg: 'text-2xl sm:text-3xl font-extrabold',
  }[size];

  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={priceSize} style={{ color: 'var(--text-primary)' }}>
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <span className="text-xs sm:text-sm line-through" style={{ color: 'var(--text-muted)' }}>
          {formatPrice(originalPrice)}
        </span>
      )}

      {showDiscountBadge && computedDiscount > 0 && (
        <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          {computedDiscount}% OFF
        </span>
      )}
    </div>
  );
}

export default PriceDisplay;