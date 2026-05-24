import type { TipsterStats } from '@/lib/supabase';

interface Props {
  stats: TipsterStats;
}

export function StatsBar({ stats }: Props) {
  const items = [
    { value: `${stats.total}+`, label: 'Picks analizados' },
    { value: `${stats.winRate}%`, label: 'Acierto global', highlight: stats.winRate >= 60 },
    { value: `${stats.roi >= 0 ? '+' : ''}${stats.roi}%`, label: 'ROI', highlight: stats.roi > 0 },
    { value: `${stats.wins}V · ${stats.losses}D`, label: 'Record histórico' },
  ];

  return (
    <section className="border-y border-[#1e1e2e] bg-[#13131a]/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map(({ value, label, highlight }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className={`text-2xl font-black tabular-nums ${highlight ? 'text-[#6C63FF]' : 'text-white'}`}>
              {value}
            </span>
            <span className="text-xs text-gray-500 font-medium text-center">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
