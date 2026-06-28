import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layout
import { MainLayout } from './components/layout/MainLayout';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import Home from './pages/Home';
import ShopAll from './pages/ShopAll';
import PerfumeCollection from './pages/PerfumeCollection';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import TrackOrder from './pages/TrackOrder';
import OrderSuccess from './pages/OrderSuccess';
import GodfatherCollection from './pages/GodfatherCollection';
import BeardGrowthKit from './pages/BeardGrowthKit';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-[#f3f3f3] text-[#111]">
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop-all" element={<ShopAll />} />
                  <Route path="/collections/perfumes" element={<PerfumeCollection />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  {/* Fallback route for other collections */}
                  <Route path="/collections/:categoryId" element={<ShopAll />} />
                  <Route path="/godfather-collection" element={<GodfatherCollection />} />
                  <Route path="/beard-growth-kit" element={<BeardGrowthKit />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </MainLayout>
              <AuthModal />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
