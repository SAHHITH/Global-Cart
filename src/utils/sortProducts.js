export function sortProducts(products = [], sortBy = 'featured') {
  const list = [...products];

  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case 'popular':
      return list.sort((a, b) => b.reviews - a.reviews);
    case 'discount':
      return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'newest':
      return list.sort((a, b) => Number(b.id) - Number(a.id));
    case 'featured':
    default:
      return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
}

export default sortProducts;