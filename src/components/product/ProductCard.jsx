import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { ProductBadge } from './ProductBadge';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { openQuickView } = useProducts();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="surface-card group relative flex flex-col justify-between overflow-hidden rounded-2xl"
    >
      {/* Top Image Container */}
      <div>
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800/70">
          <Link to={`/products/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Top Left Badge */}
          <div className="absolute left-3 top-3 z-10">
            <ProductBadge
              discount={product.discount}
              bestseller={product.bestseller}
              stock={product.stock}
            />
          </div>

          {/* Top Right Quick Actions */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <WishlistButton product={product} />

            <button
              type="button"
              onClick={() => openQuickView(product)}
              aria-label="Quick view product"
              title="Quick View"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border-color) bg-white/90 text-slate-700 shadow-xs backdrop-blur-xs transition hover:scale-105 hover:text-[#2874F0] dark:bg-slate-900/90 dark:text-slate-200 cursor-pointer"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Metadata */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
            <span className="text-[#2874F0]">{product.brand}</span>
            <span style={{ color: 'var(--text-muted)' }}>{product.category}</span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug transition hover:text-[#2874F0]"
            style={{ color: 'var(--text-primary)' }}
          >
            {product.name}
          </Link>

          <div className="mt-2">
            <RatingStars rating={product.rating} reviews={product.reviews} />
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="p-4 pt-2">
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          size="sm"
        />

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => addItem(product, 1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF9900] px-3.5 py-2.5 text-xs font-extrabold text-[#101828] shadow-xs transition hover:bg-[#E68A00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 stroke-[2.25]" />
            <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;