import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

const CATEGORY_COLORS = {
  Electronics: 'badge-primary', Clothing: 'badge-violet',
  Accessories: 'bg-amber-500/15 text-amber-400 badge',
  Footwear: 'bg-emerald-500/15 text-emerald-400 badge',
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-dark-text mb-2">Product Not Found</h1>
          <p className="text-dark-subtle mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-dark-bg pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-6 text-sm text-dark-subtle" aria-label="breadcrumb">
          <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-400 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-dark-text truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product detail */}
        <div className="glass-card overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-80 md:h-full min-h-[400px] bg-dark-card overflow-hidden">
              {!imgError ? (
                <img src={product.image} alt={product.name} onError={() => setImgError(true)}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dark-subtle">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
              )}
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark-card/80 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <span className={CATEGORY_COLORS[product.category] || 'badge-primary'}>{product.category}</span>
                  <button onClick={() => navigate(-1)} className="text-dark-subtle hover:text-dark-text transition-colors text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                    Back
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-dark-text leading-snug">{product.name}</h1>
                <p className="text-dark-subtle leading-relaxed">{product.description}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-dark-text">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-dark-subtle text-sm">incl. taxes</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Qty selector */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-dark-subtle mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button id="qty-dec" onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border text-dark-text hover:border-primary-500/50 flex items-center justify-center transition-all text-lg font-bold">
                      −
                    </button>
                    <span className="w-10 text-center text-dark-text font-bold text-lg">{qty}</span>
                    <button id="qty-inc" onClick={() => setQty(q => q + 1)}
                      className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border text-dark-text hover:border-primary-500/50 flex items-center justify-center transition-all text-lg font-bold">
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-dark-card/60 border border-dark-border">
                  <span className="text-dark-subtle text-sm">Total</span>
                  <span className="text-dark-text font-bold text-lg">₹{(product.price * qty).toLocaleString('en-IN')}</span>
                </div>

                <button id={`detail-add-cart-${product.id}`} onClick={handleAdd}
                  className={`btn-primary justify-center text-base py-4 ${added ? '!from-emerald-500 !to-emerald-600' : ''}`}>
                  {added ? (
                    <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> Added to Cart!</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg> Add to Cart</>
                  )}
                </button>
                <Link to="/cart" className="btn-secondary justify-center text-sm">View Cart</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section id="related-products" className="mt-16">
            <h2 className="text-2xl font-black text-dark-text mb-6">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => (
                <div key={p.id} onClick={() => { navigate(`/products/${p.id}`); window.scrollTo(0, 0); }}
                  className="glass-card overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
                  <div className="h-40 overflow-hidden bg-dark-card">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-text text-sm line-clamp-1 group-hover:text-primary-400 transition-colors">{p.name}</h3>
                    <span className="text-primary-400 font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
