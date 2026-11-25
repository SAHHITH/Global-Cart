import { useState, useEffect } from 'react';

export function ProductGallery({ images = [], productName = 'Product' }) {
  const validImages = images.length > 0 ? images : ['/images/placeholders/product-placeholder.png'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  return (
    <div className="space-y-3">
      {/* Primary Showcase Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border bg-slate-100 dark:bg-slate-800/60"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <img
          src={validImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
          }}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {validImages.map((img, index) => {
            const active = index === selectedIndex;
            return (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer ${
                  active
                    ? 'border-[#FF9900] ring-2 ring-[#FF9900]/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;