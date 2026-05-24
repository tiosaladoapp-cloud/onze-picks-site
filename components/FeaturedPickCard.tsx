import type { FeaturedPick } from '@/lib/supabase';

interface Props {
  pick: FeaturedPick | null;
}

const CONFIDENCE_MAP: Record<string, { label: string; color: string }> = {
  elite:  { label: 'ÉLITE',  color: '#b8920a' },
  high:   { label: 'ALTA',   color: '#2e7d32' },
  medium: { label: 'MEDIA',  color: '#ff8f00' },
  low:    { label: 'BAJA',   color: '#555555' },
};

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });
}

function TeamAvatar({ name, logo }: { name: string; logo: string | null }) {
  return (
    <div className="w-14 h-14 rounded-full bg-[#1c1c1c] flex items-center justify-center border border-[#2a2a2a] overflow-hidden shrink-0">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} width={36} height={36} className="object-contain" />
      ) : (
        <span className="text-xl font-black text-[#555555]">{name[0]}</span>
      )}
    </div>
  );
}

export function FeaturedPickCard({ pick }: Props) {
  return (
    <section id="pick-del-dia" className="py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full bg-[#947403]" />
          <h2 className="text-xl font-black text-white">Pick del día</h2>
          <span className="ml-auto text-xs text-[#555555] font-medium">Actualizado cada hora</span>
        </div>

        {!pick ? (
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8 text-center">
            <p className="text-[#555555] text-sm">Sin pick disponible hoy. Volvé más tarde.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: '1px solid rgba(148,116,3,0.25)', backgroundColor: '#141414' }}>
            {/* League header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2a2a2a]">
              {pick.league_logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pick.league_logo} alt={pick.league_name} width={16} height={16} className="object-contain" />
              )}
              <span className="text-xs text-[#a0a0a0] font-semibold flex-1">{pick.league_name}</span>
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
              <p className="text-xs text-[#555555] mb-4">{formatMatchDate(pick.match_date)}</p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamAvatar name={pick.home_team} logo={pick.home_logo} />
                  <span className="text-xs text-[#a0a0a0] font-semibold text-center max-w-[90px] leading-tight">{pick.home_team}</span>
                </div>
                <span className="text-[#555555] font-bold text-sm px-2">VS</span>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamAvatar name={pick.away_team} logo={pick.away_logo} />
                  <span className="text-xs text-[#a0a0a0] font-semibold text-center max-w-[90px] leading-tight">{pick.away_team}</span>
                </div>
              </div>

              {/* Prediction + odds */}
              <div className="mt-5 flex gap-3">
                <div className="flex-1 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3">
                  <p className="text-xs text-[#555555] font-semibold mb-1">Predicción</p>
                  <p className="text-sm text-white font-semibold">{pick.prediction}</p>
                </div>
                <div className="rounded-xl px-5 py-3 flex flex-col items-center justify-center min-w-[72px]"
                  style={{ backgroundColor: 'rgba(148,116,3,0.12)', border: '1px solid rgba(148,116,3,0.25)' }}>
                  <p className="text-xs text-[#a0a0a0] font-semibold mb-1">Cuota</p>
                  <p className="text-xl text-[#b8920a] font-black tabular-nums">{pick.odds?.toFixed(2)}</p>
                </div>
              </div>

              {/* Analysis preview */}
              {pick.analysis && (
                <div className="mt-4 rounded-xl bg-[#0a0a0a] px-4 py-3" style={{ borderLeft: '2px solid #947403' }}>
                  <p className="text-xs text-[#a0a0a0] leading-5 line-clamp-3">{pick.analysis}</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <a href="#descargar" className="btn-gold block w-full text-center py-3 rounded-xl font-bold text-sm shadow-lg">
                Ver análisis completo en la app →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
