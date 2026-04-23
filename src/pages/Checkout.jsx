import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-dark-bg pt-24 pb-16">
        <div className="max-w-xl mx-auto px-6 text-center animate-fade-in">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-dark-text mb-4">Your cart is empty</h1>
          <p className="text-dark-subtle mb-8">You need to add some items before checking out.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </main>
    );
  }

  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-dark-text mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-10 animate-slide-up">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center text-xs">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center text-xs">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" placeholder="Alex" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" placeholder="Smith" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} className="input-field" placeholder="Street address, apartment, etc." />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">City</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} className="input-field" placeholder="Mumbai" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">Pincode</label>
                  <input required name="pincode" value={formData.pincode} onChange={handleInputChange} className="input-field" placeholder="400001" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-dark-subtle mb-1.5">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="+91 98765 43210" />
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center text-xs">3</span>
                Payment Method
              </h2>
              <div className="glass-card p-6 border-primary-500/30 bg-primary-500/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-dark-text">Credit / Debit Card</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-dark-card border border-dark-border rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                    <div className="w-8 h-5 bg-dark-card border border-dark-border rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark-subtle uppercase tracking-wider mb-1.5">Card Number</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="input-field" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-dark-subtle uppercase tracking-wider mb-1.5">Expiry</label>
                      <input required name="expiry" value={formData.expiry} onChange={handleInputChange} className="input-field" placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-dark-subtle uppercase tracking-wider mb-1.5">CVV</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleInputChange} className="input-field" placeholder="•••" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5">
            <div className="glass-card p-6 sticky top-24 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold text-dark-text mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-card flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-dark-text line-clamp-1">{product.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-dark-subtle">Qty: {quantity}</span>
                        <span className="text-sm font-bold text-dark-text">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dark-border">
                <div className="flex justify-between text-dark-subtle text-sm">
                  <span>Subtotal</span>
                  <span className="text-dark-text font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-dark-subtle text-sm">
                  <span>GST (18%)</span>
                  <span className="text-dark-text font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-dark-subtle text-sm">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest mt-1">Free</span>
                </div>
                <div className="flex justify-between text-lg font-black text-dark-text border-t border-dark-border pt-4 mt-2">
                  <span>Total</span>
                  <span className="text-primary-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full mt-8 justify-center h-14 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ₹${grandTotal.toLocaleString('en-IN')}`
                )}
              </button>
              
              <p className="text-center text-[10px] text-dark-subtle mt-4 uppercase tracking-widest font-semibold">
                🔒 Secure SSL Encrypted Payment
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
