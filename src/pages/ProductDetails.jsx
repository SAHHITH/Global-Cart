import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  PackageX,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductBadge } from '@/components/product/ProductBadge';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductGrid } from '@/components/product/ProductGrid';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem, addItemSilent } = useCart();

  const product = products.find((p) => String(p.id) === String(id));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={PackageX}
          title="Product Not Found"
          description="The item you are looking for may have been moved or removed from our catalog."
          actionLabel="Back to All Products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addItemSilent(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          {
            label: product.category,
            path: `/categories/${product.category.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}`,
          },
          { label: product.name },
        ]}
      />

      {/* Top Product Showcase */}
      <div
        className="grid grid-cols-1 gap-8 rounded-3xl border p-5 sm:p-8 lg:grid-cols-12"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Left Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={product.images || [product.image]}
            productName={product.name}
          />
        </div>

        {/* Right Purchase Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-[#2874F0]/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#2874F0]">
                {product.brand}
              </span>
              <ProductBadge
                discount={product.discount}
                bestseller={product.bestseller}
                stock={product.stock}
              />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl leading-snug">
              {product.name}
            </h1>

            <RatingStars rating={product.rating} reviews={product.reviews} size="medium" />

            <div className="border-y py-4" style={{ borderColor: 'var(--border-color)' }}>
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="lg"
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                Inclusive of all local duties • Free Express Delivery on orders over ₹999
              </p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            {/* Stock Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <CheckCircle2
                className={`h-4 w-4 ${product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}
              />
              <span
                className={
                  product.stock > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }
              >
                {product.stock > 0
                  ? `In Stock — ${product.stock} units ready to ship`
                  : 'Currently Out of Stock'}
              </span>
            </div>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Quantity:
              </span>
              <div
                className="inline-flex items-center rounded-xl border"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="p-2.5 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-extrabold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                  disabled={quantity >= (product.stock || 1)}
                  aria-label="Increase quantity"
                  className="p-2.5 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                disabled={product.stock <= 0}
                onClick={() => addItem(product, quantity)}
                className="w-full"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={product.stock <= 0}
                onClick={handleBuyNow}
                className="w-full"
              >
                <Zap className="h-5 w-5" />
                <span>Buy Now</span>
              </Button>
            </div>

            <WishlistButton product={product} variant="full" className="w-full" />

            {/* Service Badges */}
            <div
              className="grid grid-cols-3 gap-2 rounded-2xl border p-3.5 text-center text-xs"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#2874F0]" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-4 w-4 text-[#FF9900]" />
                <span className="font-semibold">30-Day Return</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold">2-Yr Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details, Specifications & Reviews Tabs */}
      <div className="mt-10">
        <Tabs defaultValue="specs">
          <TabsList>
            <TabsTrigger value="specs">Technical Specifications</TabsTrigger>
            <TabsTrigger value="description">Overview & Highlights</TabsTrigger>
            <TabsTrigger value="reviews">Customer Reviews ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <div
              className="overflow-hidden rounded-2xl border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <table className="w-full text-left text-sm">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-black/2 dark:bg-white/2' : ''}
                    >
                      <th className="w-1/3 px-5 py-3.5 font-bold">{key}</th>
                      <td className="px-5 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="description">
            <div
              className="rounded-2xl border p-6 space-y-3 text-sm leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <h3 className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
                About {product.name}
              </h3>
              <p>{product.description}</p>
              <p>
                Every {product.brand} item sold through Global Cart ships in factory-sealed
                packaging with full manufacturer warranty coverage and 24/7 customer support.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <ProductReviews
              productId={product.id}
              averageRating={product.rating}
              totalReviews={product.reviews}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              More in {product.category}
            </h2>
            <Link
              to={`/categories/${product.category.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}`}
              className="text-sm font-bold text-[#2874F0] hover:underline"
            >
              View Category →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}

export default ProductDetails;