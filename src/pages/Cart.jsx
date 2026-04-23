import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.18;

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const tax = Math.round(totalPrice * TAX_RATE);
  const grandTotal = totalPrice + tax;

  const handleCheckout = () => {
    clearCart();
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <main className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center animate-slide-up max-w-md mx-auto px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-dark-text mb-3">Order Placed!</h1>
          <p className="text-dark-subtle text-lg mb-8">
            Thanks for shopping with ProCufy. Your order is being processed.
          </p>
          <Link to="/products" className="btn-primary justify-center">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-dark-bg pt-24 flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md mx-auto px-6">
          <div className="w-24 h-24 rounded-3xl bg-dark-card border border-dark-border flex items-center justify-center mx-auto mb-6 text-5xl">
            🛒
          </div>
          <h1 className="text-2xl font-black text-dark-text mb-3">Your cart is empty</h1>
          <p className="text-dark-subtle mb-8">Add some products to get started.</p>
          <Link to="/products" id="empty-cart-shop-btn" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-dark-text">Your Cart</h1>
            <p className="text-dark-subtle mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            id="clear-cart-btn"
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-lg transition-all"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <section className="lg:col-span-2 flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                id={`cart-item-${product.id}`}
                className="glass-card p-4 flex gap-4 items-start animate-fade-in"
              >
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-dark-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-dark-text text-base leading-snug line-clamp-1">
                        {product.name}
                      </h2>
                      <p className="text-xs text-dark-subtle mt-0.5">{product.category}</p>
                    </div>
                    <button
                      id={`remove-${product.id}`}
                      onClick={() => removeFromCart(product.id)}
                      className="text-dark-subtle hover:text-red-400 transition-colors flex-shrink-0 p-1"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        id={`qty-dec-${product.id}`}
                        onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQty(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border text-dark-text hover:border-primary-500/50 flex items-center justify-center transition-all font-bold text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-dark-text font-semibold">{quantity}</span>
                      <button
                        id={`qty-inc-${product.id}`}
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border text-dark-text hover:border-primary-500/50 flex items-center justify-center transition-all font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-dark-text text-base">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Order summary */}
          <aside className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-dark-text">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-dark-subtle">
                  <span>Subtotal</span>
                  <span className="text-dark-text font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-dark-subtle">
                  <span>GST (18%)</span>
                  <span className="text-dark-text font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-dark-subtle">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">Free</span>
                </div>
                <div className="h-px bg-dark-border my-1" />
                <div className="flex justify-between text-base font-black text-dark-text">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                id="checkout-btn"
                onClick={handleCheckout}
                className="btn-primary justify-center text-base py-4 mt-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Place Order
              </button>

              <Link to="/products" className="btn-secondary justify-center text-sm">
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dark-border text-center">
                {[
                  { icon: '🔒', text: 'Secure' },
                  { icon: '🚚', text: 'Free Ship' },
                  { icon: '↩️', text: 'Easy Return' },
                ].map(b => (
                  <div key={b.text} className="flex flex-col items-center gap-1">
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-[10px] text-dark-subtle font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
