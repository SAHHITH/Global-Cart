import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { NotificationToast } from '@/components/common/NotificationToast';

export function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col mobile-nav-spacer">
      <AnnouncementBar />
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <Navbar mobileOpen={mobileMenuOpen} onCloseMobile={setMobileMenuOpen} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      <ProductQuickView />
      <NotificationToast />
    </div>
  );
}

export default MainLayout;