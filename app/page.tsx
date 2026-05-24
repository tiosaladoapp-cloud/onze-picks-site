import { getFeaturedPick, getTipsterStats } from '@/lib/supabase';
import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { FeaturedPickCard } from '@/components/FeaturedPickCard';
import { FeaturesSection } from '@/components/FeaturesSection';
import { DownloadSection } from '@/components/DownloadSection';
import { Footer } from '@/components/Footer';

export const revalidate = 3600;

export default async function Home() {
  const [pick, stats] = await Promise.all([
    getFeaturedPick().catch(() => null),
    getTipsterStats().catch(() => ({ total: 0, wins: 0, losses: 0, winRate: 0, roi: 0 })),
  ]);

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsBar stats={stats} />
      <FeaturedPickCard pick={pick} />
      <FeaturesSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}
