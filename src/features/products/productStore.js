import { create } from 'zustand';
import { products as initialProducts } from '@/data/products';
import { filterProducts } from '@/utils/filterProducts';
import { sortProducts } from '@/utils/sortProducts';

const DEFAULT_FILTERS = {
  searchQuery: '',
  category: 'all',
  brands: [],
  minPrice: 0,
  maxPrice: 200000,
  minRating: 0,
  inStockOnly: false,
  onlyDeals: false,
};

export const useProductStore = create((set, get) => ({
  products: initialProducts,
  filters: { ...DEFAULT_FILTERS },
  sortBy: 'featured',
  quickViewProduct: null,

  setSearchQuery: (searchQuery) =>
    set((state) => ({ filters: { ...state.filters, searchQuery } })),

  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),

  toggleBrand: (brand) =>
    set((state) => {
      const exists = state.filters.brands.includes(brand);
      const brands = exists
        ? state.filters.brands.filter((b) => b !== brand)
        : [...state.filters.brands, brand];
      return { filters: { ...state.filters, brands } };
    }),

  setPriceRange: (minPrice, maxPrice) =>
    set((state) => ({ filters: { ...state.filters, minPrice, maxPrice } })),

  setMinRating: (minRating) =>
    set((state) => ({ filters: { ...state.filters, minRating } })),

  setInStockOnly: (inStockOnly) =>
    set((state) => ({ filters: { ...state.filters, inStockOnly } })),

  setOnlyDeals: (onlyDeals) =>
    set((state) => ({ filters: { ...state.filters, onlyDeals } })),

  updateFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),

  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS }, sortBy: 'featured' }),

  setSortBy: (sortBy) => set({ sortBy }),

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  addProduct: (newProduct) =>
    set((state) => ({
      products: [
        {
          ...newProduct,
          id: String(Date.now()),
          rating: newProduct.rating || 4.8,
          reviews: newProduct.reviews || 1,
        },
        ...state.products,
      ],
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  getFilteredProducts: () => {
    const { products, filters, sortBy } = get();
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  },
}));

export default useProductStore;