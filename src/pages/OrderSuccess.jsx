import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  const orderId = `PCF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <main className="min-h-screen bg-dark-bg pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 shadow-glow-lg shadow-emerald-500/20">
          <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">Payment Successful</p>
        <h1 className="text-4xl font-black text-dark-text mb-4">Thank you for your order!</h1>
        <p className="text-dark-subtle mb-8 leading-relaxed">
          Your order has been placed successfully and is being processed. 
          We'll send you a confirmation email with tracking details shortly.
        </p>

        <div className="glass-card p-6 mb-10 inline-block w-full max-w-sm">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-dark-border">
            <span className="text-dark-subtle text-sm">Order ID</span>
            <span className="text-dark-text font-mono font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-dark-subtle">Estimated Delivery</span>
            <span className="text-dark-text font-bold">3-5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary px-8">
            View Dashboard
          </Link>
          <Link to="/products" className="btn-secondary px-8">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border">
          <p className="text-xs text-dark-subtle">
            Need help? <a href="#support" className="text-primary-400 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </main>
  );
}
