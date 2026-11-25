import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { Button } from '@/components/common/Button';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

export function ProductQuickView() {
  const { quickViewProduct, closeQuickView } = useProducts();
  const { addItem, openDrawer } = useCart();

  if (!quickViewProduct) return null;

  const handleAddAndOpenCart = () => {
    addItem(quickViewProduct, 1);
    closeQuickView();
    openDrawer();
  };

  return (
    <Dialog open={Boolean(quickViewProduct)} onOpenChange={(open) => !open && closeQuickView()}>
      <DialogContent onClose={closeQuickView} className="max-w-3xl">
        <DialogHeader>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2874F0]">
            {quickViewProduct.brand} • {quickViewProduct.category}
          </span>
          <DialogTitle className="pr-8 text-xl">{quickViewProduct.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <RatingStars
                rating={quickViewProduct.rating}
                reviews={quickViewProduct.reviews}
                size="medium"
              />

              <PriceDisplay
                price={quickViewProduct.price}
                originalPrice={quickViewProduct.originalPrice}
                discount={quickViewProduct.discount}
                size="lg"
              />

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {quickViewProduct.description}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {quickViewProduct.stock > 0
                    ? `In Stock (${quickViewProduct.stock} units available)`
                    : 'Currently Out of Stock'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAddAndOpenCart}
                  disabled={quickViewProduct.stock <= 0}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </Button>
                <WishlistButton product={quickViewProduct} />
              </div>

              <Link
                to={`/products/${quickViewProduct.id}`}
                onClick={closeQuickView}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <span>View Full Product Details</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductQuickView;