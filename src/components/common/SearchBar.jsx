import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { useProducts } from '@/hooks/useProducts';

export function SearchBar({ className = '' }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSearchQuery, setCategory } = useProducts();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) {
      setQuery(qParam);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setCategory(selectedCategory);

    const params = new URLSearchParams();
    if (trimmed) params.set('q', trimmed);
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    setSearchQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-10 w-full items-center overflow-hidden rounded-xl bg-white shadow-xs ring-2 ring-transparent focus-within:ring-[#FF9900] ${className}`}
    >
      <select
        aria-label="Search category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="hidden sm:block h-full max-w-36.25 cursor-pointer border-r border-slate-200 bg-slate-100 px-3 text-xs font-semibold text-slate-800 outline-none hover:bg-slate-200"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Global Cart for electronics, fashion, home & more..."
        className="h-full flex-1 bg-transparent px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="px-2 text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <button
        type="submit"
        aria-label="Search"
        className="flex h-full items-center justify-center bg-[#FF9900] px-4 text-[#101828] font-bold transition hover:bg-[#E68A00] cursor-pointer"
      >
        <Search className="h-4 w-4 stroke-[2.5]" />
      </button>
    </form>
  );
}

export default SearchBar;