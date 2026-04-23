import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-surface border-t border-dark-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow">
                <span className="text-white font-black text-sm">P</span>
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary-400 to-violet-400 bg-clip-text text-transparent">
                ProCufy
              </span>
            </Link>
            <p className="text-dark-subtle text-sm leading-relaxed max-w-xs">
              Elevating your digital lifestyle with curated tech and lifestyle products. 
              Premium quality, futuristic design, and unmatched service.
            </p>
            <div className="flex items-center gap-4">
              {['twitter', 'instagram', 'github', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-subtle hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                  aria-label={social}
                >
                  <span className="capitalize text-[10px] font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-text font-bold mb-6">Shop</h3>
            <ul className="space-y-4">
              {['All Products', 'Electronics', 'Fashion', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-dark-subtle hover:text-primary-400 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-dark-text font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              {['Help Center', 'Track Order', 'Returns & Refunds', 'Shipping Policy'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-dark-subtle hover:text-primary-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-dark-text font-bold mb-6">Stay Ahead</h3>
            <p className="text-dark-subtle text-sm mb-4">
              Subscribe for early access to drops and exclusive offers.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder:text-dark-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-subtle text-xs">
            © {currentYear} ProCufy E-Commerce. Built with passion for the future.
          </p>
          <div className="flex items-center gap-6 text-xs text-dark-subtle">
            <a href="#privacy" className="hover:text-dark-text transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-dark-text transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-dark-text transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
