import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORY_COLORS = {
  Electronics:  'badge-primary',
  Clothing:     'badge-violet',
  Accessories:  'bg-amber-500/15 text-amber-400 badge',
  Footwear:     'bg-emerald-500/15 text-emerald-400 badge',
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      id={`product-card-${product.id}`}
      onClick={() => navigate(`/products/${product.id}`)}
      className="glass-card overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-fade-in"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-dark-card">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-dark-card text-dark-subtle">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <span className={CATEGORY_COLORS[product.category] || 'badge-primary'}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-dark-text text-base leading-snug line-clamp-1 group-hover:text-primary-400 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-dark-subtle mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-dark-border">
          <span className="text-xl font-bold text-gray-900 dark:text-dark-text">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              added
                ? 'bg-emerald-500/20 text-emerald-400 scale-95'
                : 'bg-primary-500/15 text-primary-400 hover:bg-primary-500 hover:text-white hover:shadow-glow'
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
