import Image from 'next/image';
import type { TipsterStats } from '@/lib/supabase';

interface Props {
  stats: TipsterStats;
}

export function StatsBar({ stats }: Props) {
  const displayTotal = stats.total > 0 ? stats.total : 100;

  return (
    <section className="border-y border-[#2a2a2a] bg-[#141414]/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-3 sm:grid-cols-5 gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black tabular-nums text-white">+{displayTotal}</span>
          <span className="text-xs text-[#555555] font-medium text-center leading-tight">Picks analizados con IA</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black tabular-nums text-white">+15</span>
          <span className="text-xs text-[#555555] font-medium text-center leading-tight">Ligas cubiertas</span>
        </div>

        {/* FIFA World Cup 2026 — centro */}
        <div className="flex flex-col items-center gap-1">
          <Image src="/wc2026.png" alt="FIFA World Cup 2026" width={36} height={36} className="object-contain" />
          <span className="text-xs text-[#555555] font-medium text-center leading-tight">World Cup 2026</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black tabular-nums text-[#b8920a]">Diario</span>
          <span className="text-xs text-[#555555] font-medium text-center leading-tight">Nuevo pick cada día</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black tabular-nums text-[#b8920a]">3 días</span>
          <span className="text-xs text-[#555555] font-medium text-center leading-tight">Elite gratis al registrarte</span>
        </div>
      </div>
    </section>
  );
}
