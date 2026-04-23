import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const featured = products.slice(0, 3);

const STATS = [
  { value: `${products.length}+`, label: 'Products', icon: '📦' },
  { value: '4',  label: 'Categories', icon: '🏷️' },
  { value: '₹499', label: 'Starting From', icon: '💰' },
  { value: '24/7', label: 'Support', icon: '🛠️' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg"
      >
        {/* Background glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-600/20 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-900/10 blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            Premium E-Commerce Experience
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6 text-dark-text">
            Shop the{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Future
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none">
                <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#818cf8" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            , Today.
          </h1>

          <p className="text-lg sm:text-xl text-dark-subtle max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover curated electronics, fashion, and accessories — all at unbeatable prices.
            Fast delivery, premium quality, zero compromise.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" id="hero-shop-cta" className="btn-primary text-base px-8 py-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              Explore Products
            </Link>
            <Link to="/cart" id="hero-cart-cta" className="btn-secondary text-base px-8 py-4">
              View Cart
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center gap-1 text-dark-subtle text-xs animate-float">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section id="stats" className="bg-dark-surface border-y border-dark-border py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-black text-dark-text">{stat.value}</div>
              <div className="text-sm text-dark-subtle mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="featured" className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="text-3xl sm:text-4xl font-black text-dark-text">Featured Products</h2>
            </div>
            <Link
              to="/products"
              id="see-all-link"
              className="text-primary-400 text-sm font-semibold hover:text-primary-300 flex items-center gap-1 transition-colors"
            >
              See all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="cta-banner" className="py-20 bg-dark-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-violet-600 p-10 text-center shadow-glow-lg">
            {/* Background blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to explore?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Browse our full catalog of curated products across all categories.
              </p>
              <Link to="/products" id="cta-banner-btn" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-600 font-bold text-base hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg">
                Shop Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
