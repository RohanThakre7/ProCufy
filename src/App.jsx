import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';

function NotFound() {
  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center pt-20">
      <div className="text-center animate-fade-in px-6">
        <div className="text-8xl font-black bg-gradient-to-r from-primary-400 to-violet-400 bg-clip-text text-transparent mb-4">404</div>
        <h1 className="text-2xl font-bold text-dark-text mb-2">Page not found</h1>
        <p className="text-dark-subtle mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary">Go Home</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/products"      element={<ProductListing />} />
              <Route path="/products/:id"  element={<ProductDetails />} />
              <Route path="/cart"          element={<Cart />} />
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="*"              element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

