'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase, type FeaturedPick } from '@/lib/supabase';

function localDayBounds(): { from: string; to: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const from = new Date(y, m, d, 0, 0, 0, 0);
  const to   = new Date(y, m, d + 1, 0, 0, 0, 0);
  return { from: from.toISOString(), to: to.toISOString() };
}

async function fetchFeaturedPick(): Promise<FeaturedPick | null> {
  const { from, to } = localDayBounds();
  const { data, error } = await supabase
    .from('picks')
    .select('id, home_team, away_team, home_logo, away_logo, league_name, league_logo, prediction, odds, confidence, pick_type, match_date, analysis')
    .gte('match_date', from)
    .lt('match_date', to)
    .eq('is_premium', false)
    .order('confidence', { ascending: false })
    .order('odds', { ascending: false })
    .limit(1)
    .single();
  if (error || !data) return null;
  return data as FeaturedPick;
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
        <img src={logo} alt={name} width={36} height={36} className="object-contain" crossOrigin="anonymous" />
      ) : (
        <span className="text-xl font-black text-[#555555]">{name[0]}</span>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-5 animate-pulse">
      <div className="flex items-center gap-2 pb-4 border-b border-[#2a2a2a] mb-4">
        <div className="w-4 h-4 rounded bg-[#2a2a2a]" />
        <div className="h-3 w-32 rounded bg-[#2a2a2a]" />
      </div>
      <div className="h-3 w-40 rounded bg-[#2a2a2a] mb-5" />
      <div className="flex justify-between gap-4 mb-5">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-14 h-14 rounded-full bg-[#2a2a2a]" />
          <div className="h-3 w-16 rounded bg-[#2a2a2a]" />
        </div>
        <div className="w-8 h-4 rounded bg-[#2a2a2a] self-center" />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-14 h-14 rounded-full bg-[#2a2a2a]" />
          <div className="h-3 w-16 rounded bg-[#2a2a2a]" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 h-16 rounded-xl bg-[#2a2a2a]" />
        <div className="w-20 h-16 rounded-xl bg-[#2a2a2a]" />
      </div>
    </div>
  );
}

// Card rendered off-screen for html2canvas capture. Uses inline styles only.
function ShareCard({ pick }: { pick: FeaturedPick }) {
  const conf = CONFIDENCE_MAP[pick.confidence] ?? CONFIDENCE_MAP.medium;
  return (
    <div style={{
      width: 400,
      backgroundColor: '#141414',
      border: '1px solid rgba(148,116,3,0.35)',
      borderRadius: 16,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderBottom: '1px solid #2a2a2a' }}>
        {pick.league_logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pick.league_logo} width={16} height={16} style={{ objectFit: 'contain' }} crossOrigin="anonymous" alt="" />
        )}
        <span style={{ fontSize: 12, color: '#a0a0a0', fontWeight: 600, flex: 1 }}>{pick.league_name}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999,
          color: conf.color, border: `1px solid ${conf.color}50`, backgroundColor: `${conf.color}20`,
        }}>{conf.label}</span>
      </div>

      {/* Match */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontSize: 11, color: '#555555', marginBottom: 18, margin: '0 0 18px' }}>
          {formatMatchDate(pick.match_date)}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Home */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#1c1c1c', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {pick.home_logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={pick.home_logo} width={36} height={36} style={{ objectFit: 'contain' }} crossOrigin="anonymous" alt="" />
                : <span style={{ fontSize: 20, fontWeight: 900, color: '#555555' }}>{pick.home_team[0]}</span>}
            </div>
            <span style={{ fontSize: 11, color: '#a0a0a0', fontWeight: 600, textAlign: 'center', maxWidth: 90 }}>{pick.home_team}</span>
          </div>
          <span style={{ color: '#555555', fontWeight: 700, fontSize: 14 }}>VS</span>
          {/* Away */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#1c1c1c', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {pick.away_logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={pick.away_logo} width={36} height={36} style={{ objectFit: 'contain' }} crossOrigin="anonymous" alt="" />
                : <span style={{ fontSize: 20, fontWeight: 900, color: '#555555' }}>{pick.away_team[0]}</span>}
            </div>
            <span style={{ fontSize: 11, color: '#a0a0a0', fontWeight: 600, textAlign: 'center', maxWidth: 90 }}>{pick.away_team}</span>
          </div>
        </div>

        {/* Prediction + odds */}
        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, borderRadius: 12, backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', padding: '12px 16px' }}>
            <p style={{ fontSize: 11, color: '#555555', fontWeight: 600, margin: '0 0 4px' }}>Predicción</p>
            <p style={{ fontSize: 13, color: 'white', fontWeight: 600, margin: 0 }}>{pick.prediction}</p>
          </div>
          <div style={{ borderRadius: 12, padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 80, backgroundColor: 'rgba(148,116,3,0.12)', border: '1px solid rgba(148,116,3,0.3)' }}>
            <p style={{ fontSize: 11, color: '#a0a0a0', fontWeight: 600, margin: '0 0 4px' }}>Cuota</p>
            <p style={{ fontSize: 22, color: '#b8920a', fontWeight: 900, margin: 0 }}>{pick.odds?.toFixed(2)}</p>
          </div>
        </div>

        {/* Analysis */}
        {pick.analysis && (
          <div style={{ marginTop: 16, borderRadius: 12, backgroundColor: '#0a0a0a', padding: '12px 16px', borderLeft: '2px solid #947403' }}>
            <p style={{ fontSize: 11, color: '#a0a0a0', lineHeight: 1.6, margin: 0 }}>{pick.analysis}</p>
          </div>
        )}
      </div>

      {/* Footer branding */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ borderRadius: 12, backgroundColor: 'rgba(148,116,3,0.12)', border: '1px solid rgba(148,116,3,0.3)', padding: '12px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#b8920a', fontWeight: 700, margin: 0 }}>Análisis completo en Onze Picks</p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedPickCard() {
  const [pick, setPick] = useState<FeaturedPick | null | undefined>(undefined);
  const [isSharing, setIsSharing] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFeaturedPick().then(setPick).catch(() => setPick(null));
  }, []);

  async function handleShare() {
    if (!pick || !shareRef.current || isSharing) return;
    setIsSharing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#141414',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) { setIsSharing(false); return; }
        const file = new File([blob], 'onze-picks.png', { type: 'image/png' });
        try {
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Pick del día · Onze Picks' });
          } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'onze-picks.png';
            a.click();
            URL.revokeObjectURL(a.href);
          }
        } catch {
          // user cancelled share
        } finally {
          setIsSharing(false);
        }
      }, 'image/png');
    } catch {
      setIsSharing(false);
    }
  }

  return (
    <section id="pick-del-dia" className="py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full bg-[#947403]" />
          <h2 className="text-xl font-black text-white">Pick del día</h2>
          <span className="ml-auto text-xs text-[#555555] font-medium">Según tu horario local</span>
        </div>

        {pick === undefined ? (
          <Skeleton />
        ) : !pick ? (
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8 text-center">
            <p className="text-[#555555] text-sm">Sin pick disponible hoy. Volvé más tarde.</p>
          </div>
        ) : (
          <>
            {/* Visible card */}
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

              {/* CTA + Share */}
              <div className="px-5 pb-5 flex gap-3">
                <a href="#descargar" className="btn-gold flex-1 text-center py-3 rounded-xl font-bold text-sm shadow-lg">
                  Ver análisis completo en la app →
                </a>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="rounded-xl px-4 py-3 flex items-center justify-center shrink-0 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: 'rgba(148,116,3,0.12)', border: '1px solid rgba(148,116,3,0.25)' }}
                  title="Compartir como imagen"
                >
                  {isSharing ? (
                    <svg className="animate-spin" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b8920a" strokeWidth={2}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b8920a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Off-screen share card for html2canvas */}
            <div style={{ position: 'fixed', left: -9999, top: 0, pointerEvents: 'none' }} aria-hidden>
              <div ref={shareRef}>
                <ShareCard pick={pick} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
