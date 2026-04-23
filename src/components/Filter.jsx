const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Accessories', 'Footwear'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,000', min: 2000, max: 3000 },
  { label: 'Above ₹3,000', min: 3000, max: Infinity },
];
const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc',   label: 'Name: A → Z' },
];

export default function Filter({ category, onCategory, priceRange, onPriceRange, sort, onSort }) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-subtle mb-3">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => onCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                category === cat
                  ? 'bg-primary-500/20 text-primary-400 font-semibold'
                  : 'text-gray-600 dark:text-dark-subtle hover:bg-gray-100 dark:hover:bg-dark-card hover:text-gray-900 dark:hover:text-dark-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-subtle mb-3">
          Price Range
        </h3>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((range, i) => {
            const active =
              priceRange.min === range.min &&
              (priceRange.max === range.max || (priceRange.max === Infinity && range.max === Infinity));
            return (
              <button
                key={i}
                id={`filter-price-${i}`}
                onClick={() => onPriceRange(range)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-violet-500/20 text-violet-400 font-semibold'
                    : 'text-gray-600 dark:text-dark-subtle hover:bg-gray-100 dark:hover:bg-dark-card hover:text-gray-900 dark:hover:text-dark-text'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-subtle mb-3">
          Sort By
        </h3>
        <select
          id="filter-sort"
          value={sort}
          onChange={e => onSort(e.target.value)}
          className="input-field text-sm"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
