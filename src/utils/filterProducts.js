export function filterProducts(products = [], filters = {}) {
  const {
    searchQuery = '',
    category = 'all',
    brands = [],
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    inStockOnly = false,
    onlyDeals = false,
  } = filters;

  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    // Search query match
    if (query) {
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      const matchesDesc = product.description?.toLowerCase().includes(query);
      if (!matchesName && !matchesBrand && !matchesCategory && !matchesDesc) {
        return false;
      }
    }

    // Category filter
    if (category && category !== 'all') {
      if (product.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    // Brand filter
    if (Array.isArray(brands) && brands.length > 0) {
      const normalizedBrands = brands.map((b) => b.toLowerCase());
      if (!normalizedBrands.includes(product.brand.toLowerCase())) {
        return false;
      }
    }

    // Price range filter
    if (product.price < Number(minPrice || 0)) return false;
    if (maxPrice !== Infinity && maxPrice !== null && product.price > Number(maxPrice)) {
      return false;
    }

    // Rating filter
    if (minRating > 0 && product.rating < Number(minRating)) {
      return false;
    }

    // Stock filter
    if (inStockOnly && product.stock <= 0) {
      return false;
    }

    // Deals filter
    if (onlyDeals && (!product.discount || product.discount < 15)) {
      return false;
    }

    return true;
  });
}

export default filterProducts;