import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import products from '../data/products.json';

const DEFAULT_PRICE = { min: 0, max: Infinity };

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]         = useState(searchParams.get('search') || '');
  const [category, setCategory]     = useState('All');
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE);
  const [sort, setSort]             = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearch(q);
  }, [searchParams]);

  // Update URL when search state changes
  const handleSearchChange = (val) => {
    setSearch(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') list = list.filter(p => p.category === category);
    list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name-asc')   list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, priceRange, sort]);

  const resetFilters = () => {
    setSearch(''); setCategory('All'); setPriceRange(DEFAULT_PRICE); setSort('default');
    setSearchParams({});
  };

  const activeFilters = category !== 'All' || priceRange.min > 0 || priceRange.max !== Infinity || sort !== 'default';

  return (
    <main className="min-h-screen bg-dark-bg pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl font-black text-dark-text mb-2">Shop All Products</h1>
          <p className="text-dark-subtle">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-subtle pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            id="product-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            className="input-field pl-11"
          />
          {search && (
            <button onClick={() => handleSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-subtle hover:text-dark-text transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {activeFilters && (
              <button id="clear-filters" onClick={resetFilters} className="text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors font-medium">
                ✕ Clear Filters
              </button>
            )}
            {category !== 'All' && <span className="badge-primary">{category}</span>}
          </div>
          <button id="mobile-filter-toggle" onClick={() => setFilterOpen(o => !o)} className="md:hidden btn-secondary text-sm py-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <aside className={`w-56 flex-shrink-0 ${filterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="glass-card p-5 sticky top-24">
              <Filter category={category} onCategory={setCategory} priceRange={priceRange} onPriceRange={setPriceRange} sort={sort} onSort={setSort} />
            </div>
          </aside>

          <section className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-dark-card flex items-center justify-center text-3xl">🔍</div>
                <h3 className="text-xl font-bold text-dark-text">No products found</h3>
                <p className="text-dark-subtle max-w-sm">Try adjusting your filters or search query.</p>
                <button onClick={resetFilters} className="btn-primary mt-2">Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

