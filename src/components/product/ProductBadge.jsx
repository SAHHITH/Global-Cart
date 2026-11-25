export function ProductBadge({ discount = 0, bestseller = false, stock = 10 }) {
  if (stock <= 0) {
    return (
      <span className="rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-xs">
        Sold Out
      </span>
    );
  }

  if (bestseller) {
    return (
      <span className="rounded-md bg-[#FF9900] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#101828] shadow-xs">
        Bestseller
      </span>
    );
  }

  if (discount >= 15) {
    return (
      <span className="rounded-md bg-[#2874F0] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-xs">
        -{discount}% Deal
      </span>
    );
  }

  return null;
}

export default ProductBadge;