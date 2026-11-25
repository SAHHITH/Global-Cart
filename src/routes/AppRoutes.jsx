import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetails } from '@/pages/ProductDetails';
import { Categories } from '@/pages/Categories';
import { CategoryDetails } from '@/pages/CategoryDetails';
import { SearchResults } from '@/pages/SearchResults';
import { Cart } from '@/pages/Cart';
import { Wishlist } from '@/pages/Wishlist';
import { Checkout } from '@/pages/Checkout';
import { OrderSuccess } from '@/pages/OrderSuccess';
import { Offers } from '@/pages/Offers';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Orders } from '@/pages/Orders';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { NotFound } from '@/pages/NotFound';
import { Login } from '@/pages/Login';
import { useAuthStore } from '@/features/auth/authStore';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function ProtectedStorefront() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <MainLayout />;
}

export function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Startup / Auth Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Storefront Routes (Accessible after login) */}
        <Route element={<ProtectedStorefront />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
