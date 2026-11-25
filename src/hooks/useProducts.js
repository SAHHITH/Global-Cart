import { useMemo } from 'react';
import { useProductStore } from '@/features/products/productStore';
import { filterProducts } from '@/utils/filterProducts';
import { sortProducts } from '@/utils/sortProducts';

export function useProducts() {
  const products = useProductStore((state) => state.products);
  const filters = useProductStore((state) => state.filters);
  const sortBy = useProductStore((state) => state.sortBy);
  const quickViewProduct = useProductStore((state) => state.quickViewProduct);

  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const setCategory = useProductStore((state) => state.setCategory);
  const toggleBrand = useProductStore((state) => state.toggleBrand);
  const setPriceRange = useProductStore((state) => state.setPriceRange);
  const setMinRating = useProductStore((state) => state.setMinRating);
  const setInStockOnly = useProductStore((state) => state.setInStockOnly);
  const setOnlyDeals = useProductStore((state) => state.setOnlyDeals);
  const updateFilters = useProductStore((state) => state.updateFilters);
  const resetFilters = useProductStore((state) => state.resetFilters);
  const setSortBy = useProductStore((state) => state.setSortBy);
  const openQuickView = useProductStore((state) => state.openQuickView);
  const closeQuickView = useProductStore((state) => state.closeQuickView);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  }, [products, filters, sortBy]);

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].sort();
  }, [products]);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    [products]
  );

  const bestsellers = useMemo(
    () => products.filter((p) => p.bestseller),
    [products]
  );

  return {
    products,
    filteredProducts,
    featuredProducts,
    bestsellers,
    brands,
    filters,
    sortBy,
    quickViewProduct,
    setSearchQuery,
    setCategory,
    toggleBrand,
    setPriceRange,
    setMinRating,
    setInStockOnly,
    setOnlyDeals,
    updateFilters,
    resetFilters,
    setSortBy,
    openQuickView,
    closeQuickView,
    addProduct,
    deleteProduct,
  };
}

export default useProducts;