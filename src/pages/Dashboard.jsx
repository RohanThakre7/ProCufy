import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.18;

export default function Dashboard() {
  const { items, totalItems, totalPrice, removeFromCart } = useCart();

  const tax = Math.round(totalPrice * TAX_RATE);
  const grandTotal = totalPrice + tax;
  const categories = [...new Set(items.map(i => i.product.category))];

  const stats = [
    {
      label: 'Items in Cart',
      value: totalItems,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      ),
      color: 'text-primary-400',
      bg: 'bg-primary-500/10',
    },
    {
      label: 'Cart Subtotal',
      value: `₹${totalPrice.toLocaleString('en-IN')}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total (with GST)',
      value: `₹${grandTotal.toLocaleString('en-IN')}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
        </svg>
      ),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Categories',
      value: categories.length || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      ),
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <main className="min-h-screen bg-dark-bg pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="py-8">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-3xl sm:text-4xl font-black text-dark-text">Dashboard</h1>
          <p className="text-dark-subtle mt-1">Your shopping summary at a glance</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card animate-fade-in">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-1`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-dark-subtle">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="glass-card p-16 flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-dark-card border border-dark-border flex items-center justify-center text-4xl">
              🛒
            </div>
            <h2 className="text-xl font-bold text-dark-text">Cart is empty</h2>
            <p className="text-dark-subtle max-w-sm">Add some products to see your dashboard come to life.</p>
            <Link to="/products" id="dashboard-shop-btn" className="btn-primary mt-2">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart table */}
            <div className="glass-card overflow-hidden mb-8 animate-slide-up">
              <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
                <h2 className="text-lg font-bold text-dark-text">Cart Items</h2>
                <Link to="/cart" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
                  Manage Cart →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-dark-subtle">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-dark-subtle hidden sm:table-cell">Category</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-dark-subtle">Price</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-dark-subtle">Qty</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-widest text-dark-subtle">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ product, quantity }) => (
                      <tr key={product.id} className="border-b border-dark-border/50 hover:bg-dark-card/40 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark-card flex-shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                                onError={e => { e.target.style.display = 'none'; }} />
                            </div>
                            <Link
                              to={`/products/${product.id}`}
                              className="font-medium text-dark-text hover:text-primary-400 transition-colors line-clamp-1"
                            >
                              {product.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <span className="badge-primary">{product.category}</span>
                        </td>
                        <td className="px-4 py-4 text-right text-dark-subtle">
                          ₹{product.price.toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4 text-right text-dark-text font-medium">
                          ×{quantity}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="font-bold text-dark-text">
                              ₹{(product.price * quantity).toLocaleString('en-IN')}
                            </span>
                            <button
                              id={`dash-remove-${product.id}`}
                              onClick={() => removeFromCart(product.id)}
                              className="opacity-0 group-hover:opacity-100 text-dark-subtle hover:text-red-400 transition-all"
                              aria-label="Remove"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table footer totals */}
              <div className="px-6 py-4 bg-dark-card/30 border-t border-dark-border">
                <div className="flex flex-col items-end gap-1 text-sm max-w-xs ml-auto">
                  <div className="flex justify-between w-full text-dark-subtle">
                    <span>Subtotal</span><span className="text-dark-text font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between w-full text-dark-subtle">
                    <span>GST (18%)</span><span className="text-dark-text font-medium">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between w-full text-base font-black text-dark-text border-t border-dark-border pt-2 mt-1">
                    <span>Grand Total</span><span className="text-primary-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category breakdown */}
            {categories.length > 1 && (
              <div className="glass-card p-6 animate-slide-up">
                <h2 className="text-lg font-bold text-dark-text mb-4">Category Breakdown</h2>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => {
                    const catItems = items.filter(i => i.product.category === cat);
                    const catTotal = catItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
                    const pct = Math.round((catTotal / totalPrice) * 100);
                    return (
                      <div key={cat} className="flex-1 min-w-[140px] p-4 rounded-xl bg-dark-card border border-dark-border">
                        <div className="text-sm font-semibold text-dark-text">{cat}</div>
                        <div className="text-xs text-dark-subtle mt-0.5">{catItems.reduce((s, i) => s + i.quantity, 0)} item(s)</div>
                        <div className="mt-2 text-base font-black text-primary-400">₹{catTotal.toLocaleString('en-IN')}</div>
                        <div className="mt-2 h-1.5 rounded-full bg-dark-border overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500 transition-all duration-500"
                            style={{ width: `${pct}%` }} />
                        </div>
                        <div className="text-xs text-dark-subtle mt-1">{pct}% of total</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
