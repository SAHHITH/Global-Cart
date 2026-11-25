import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { DealOfTheDay } from '@/components/home/DealOfTheDay';
import { PromotionalBanner } from '@/components/home/PromotionalBanner';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BrandShowcase } from '@/components/home/BrandShowcase';

export function Home() {
  return (
    <div className="pb-6">
      <HeroSection />
      <CategorySection />
      <DealOfTheDay />
      <PromotionalBanner />
      <FeaturedProducts />
      <BrandShowcase />
    </div>
  );
}

export default Home;