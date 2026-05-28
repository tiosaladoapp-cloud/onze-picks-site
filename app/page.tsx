import { getTipsterStats } from '@/lib/supabase';
import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { FeaturedPickCard } from '@/components/FeaturedPickCard';
import { FeaturesSection } from '@/components/FeaturesSection';
import { GroupsSection } from '@/components/GroupsSection';
import { MundialSection } from '@/components/MundialSection';
import { FAQSection } from '@/components/FAQSection';
import { PricingSection } from '@/components/PricingSection';
import { DownloadSection } from '@/components/DownloadSection';
import { Footer } from '@/components/Footer';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export default async function Home() {
  const stats = await getTipsterStats().catch(() => ({ total: 0, wins: 0, losses: 0, winRate: 0, roi: 0 }));

  return (
    <main className="flex flex-col min-h-screen">
      <ScrollAnimator />
      <HeroSection />
      <StatsBar stats={stats} />
      <div data-animate><FeaturedPickCard /></div>
      <div data-animate><FeaturesSection /></div>
      <div data-animate><MundialSection /></div>
      <div data-animate><GroupsSection /></div>
      <div data-animate><PricingSection /></div>
      <div data-animate><DownloadSection /></div>
      <div data-animate><FAQSection /></div>
      <Footer />
    </main>
  );
}
