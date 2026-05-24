import Image from 'next/image';
import type { FeaturedPick } from '@/lib/supabase';

interface Props {
  pick: FeaturedPick | null;
}

const CONFIDENCE_MAP: Record<string, { label: string; color: string }> = {
  elite:  { label: 'ÉLITE',  color: '#6C63FF' },
  high:   { label: 'ALTA',   color: '#22c55e' },
  medium: { label: 'MEDIA',  color: '#f59e0b' },
  low:    { label: 'BAJA',   color: '#6b7280' },
};

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });
}

export function FeaturedPickCard({ pick }: Props) {
  return (
    <section id="pick-del-dia" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 rounded-full bg-[#6C63FF]" />
          <h2 className="text-xl font-black text-white">Pick del día</h2>
        </div>

        {!pick ? (
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-8 text-center">
            <p className="text-gray-500 text-sm">Sin pick disponible hoy. Volvé más tarde.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#6C63FF]/20 bg-[#13131a] overflow-hidden shadow-xl shadow-[#6C63FF]/5">
            {/* League header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1e1e2e]">
              {pick.league_logo && (
                <Image src={pick.league_logo} alt={pick.league_name} width={16} height={16} className="object-contain" />
              )}
              <span className="text-xs text-gray-400 font-semibold flex-1">{pick.league_name}</span>
              {(() => {
                const conf = CONFIDENCE_MAP[pick.confidence] ?? CONFIDENCE_MAP.medium;
                return (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full border"
                    style={{ color: conf.color, borderColor: conf.color + '50', backgroundColor: conf.color + '15' }}
                  >
                    {conf.label}
                  </span>
                );
              })()}
            </div>

            {/* Match */}
            <div className="px-5 py-5">
              <p className="text-xs text-gray-500 mb-2">{formatMatchDate(pick.match_date)}</p>
              <div className="flex items-center justify-between gap-4">
                <TeamLogo name={pick.home_team} logo={pick.home_logo} />
                <span className="text-gray-600 font-bold text-sm">VS</span>
                <TeamLogo name={pick.away_team} logo={pick.away_logo} align="right" />
              </div>

              {/* Prediction + odds */}
              <div className="mt-5 flex gap-3">
                <div className="flex-1 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] px-4 py-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Predicción</p>
                  <p className="text-sm text-white font-semibold">{pick.prediction}</p>
                </div>
                <div className="rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 px-5 py-3 flex flex-col items-center justify-center min-w-[72px]">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Cuota</p>
                  <p className="text-xl text-[#6C63FF] font-black tabular-nums">{pick.odds?.toFixed(2)}</p>
                </div>
              </div>

              {/* Analysis preview */}
              {pick.analysis && (
                <div className="mt-4 rounded-xl bg-[#0a0a0f] border-l-2 border-[#6C63FF] px-4 py-3">
                  <p className="text-xs text-gray-400 leading-5 line-clamp-3">{pick.analysis}</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <a
                href="#descargar"
                className="block w-full text-center py-3 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e8] transition-colors text-white font-bold text-sm shadow-lg shadow-[#6C63FF]/20"
              >
                Ver análisis completo en la app →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TeamLogo({ name, logo, align = 'left' }: { name: string; logo: string | null; align?: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col items-center gap-2 flex-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <div className="w-12 h-12 rounded-full bg-[#1e1e2e] flex items-center justify-center border border-[#2a2a3e] overflow-hidden">
        {logo ? (
          <Image src={logo} alt={name} width={32} height={32} className="object-contain" />
        ) : (
          <span className="text-lg font-black text-gray-500">{name[0]}</span>
        )}
      </div>
      <span className="text-xs text-gray-300 font-semibold text-center max-w-[80px] leading-tight">{name}</span>
    </div>
  );
}
