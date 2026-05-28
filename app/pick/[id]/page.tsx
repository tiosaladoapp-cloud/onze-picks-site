import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onzepicks-web.vercel.app';

const CONF_MAP: Record<string, { label: string; color: string }> = {
  elite:  { label: 'ÉLITE',  color: '#b8920a' },
  high:   { label: 'ALTA',   color: '#2e7d32' },
  medium: { label: 'MEDIA',  color: '#ff8f00' },
  low:    { label: 'BAJA',   color: '#888888' },
};

async function getPick(id: string) {
  const { data } = await supabase
    .from('picks')
    .select('id, home_team, away_team, home_logo, away_logo, league_name, league_logo, prediction, odds, confidence, pick_type, match_date, analysis, result, home_score, away_score, is_premium')
    .eq('id', id)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pick = await getPick(id);
  if (!pick) return { title: 'Pick no encontrado · Onze Picks' };

  const conf = CONF_MAP[pick.confidence]?.label ?? pick.confidence;
  const title = `${pick.home_team} vs ${pick.away_team} · Onze Picks`;
  const description = pick.is_premium
    ? `Pick premium · ${pick.league_name} · Confianza ${conf} · Descargá la app para ver el análisis completo.`
    : `Predicción: ${pick.prediction} · Cuota ${pick.odds?.toFixed(2)} · Confianza ${conf} · ${pick.league_name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/pick/${id}`,
      siteName: 'Onze Picks',
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: `${SITE_URL}/pick/${id}` },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });
}

export default async function PickPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pick = await getPick(id);
  if (!pick) notFound();

  const conf = CONF_MAP[pick.confidence] ?? CONF_MAP.medium;
  const isResolved = pick.result === 'win' || pick.result === 'loss';
  const hasScore = pick.home_score != null && pick.away_score != null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Back link */}
        <a href="/" className="inline-flex items-center gap-2 text-xs text-[#555] mb-6 hover:text-[#b8920a] transition-colors">
          ← onzepicks.app
        </a>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(148,116,3,0.3)', backgroundColor: '#141414' }}>

          {/* League header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2a2a2a]">
            {pick.league_logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pick.league_logo} alt="" width={16} height={16} className="object-contain" />
            )}
            <span className="text-xs text-[#a0a0a0] font-semibold flex-1">{pick.league_name}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full border"
              style={{ color: conf.color, borderColor: conf.color + '50', backgroundColor: conf.color + '15' }}
            >
              {conf.label}
            </span>
            {isResolved && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pick.result === 'win' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {pick.result === 'win' ? '✓ GANADA' : '✗ PERDIDA'}
                {hasScore ? ` ${pick.home_score}-${pick.away_score}` : ''}
              </span>
            )}
          </div>

          {/* Match */}
          <div className="px-5 py-5">
            <p className="text-xs text-[#555555] mb-5">{formatDate(pick.match_date)}</p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                {pick.home_logo ? (
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pick.home_logo} alt={pick.home_team} width={40} height={40} className="object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center">
                    <span className="text-2xl font-black text-[#555]">{pick.home_team[0]}</span>
                  </div>
                )}
                <span className="text-xs text-[#a0a0a0] font-semibold text-center max-w-[100px] leading-tight">{pick.home_team}</span>
              </div>
              <span className="text-[#555] font-bold text-sm">VS</span>
              <div className="flex flex-col items-center gap-2 flex-1">
                {pick.away_logo ? (
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pick.away_logo} alt={pick.away_team} width={40} height={40} className="object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center">
                    <span className="text-2xl font-black text-[#555]">{pick.away_team[0]}</span>
                  </div>
                )}
                <span className="text-xs text-[#a0a0a0] font-semibold text-center max-w-[100px] leading-tight">{pick.away_team}</span>
              </div>
            </div>

            {/* Prediction + odds */}
            <div className="mt-5 flex gap-3">
              <div className="flex-1 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3">
                <p className="text-xs text-[#555] font-semibold mb-1">Predicción</p>
                {pick.is_premium ? (
                  <p className="text-sm text-[#555] font-semibold italic">Solo en la app</p>
                ) : (
                  <p className="text-sm text-white font-semibold">{pick.prediction}</p>
                )}
              </div>
              {!pick.is_premium && pick.odds && (
                <div className="rounded-xl px-5 py-3 flex flex-col items-center justify-center min-w-[80px]"
                  style={{ backgroundColor: 'rgba(148,116,3,0.12)', border: '1px solid rgba(148,116,3,0.25)' }}>
                  <p className="text-xs text-[#a0a0a0] font-semibold mb-1">Cuota</p>
                  <p className="text-2xl text-[#b8920a] font-black tabular-nums">{pick.odds.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Analysis */}
            {!pick.is_premium && pick.analysis && (
              <div className="mt-4 rounded-xl bg-[#0a0a0a] px-4 py-3" style={{ borderLeft: '2px solid #947403' }}>
                <p className="text-xs text-[#a0a0a0] leading-5">{pick.analysis}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="px-5 pb-5">
            <a
              href="/#descargar"
              className="btn-gold block w-full text-center py-3 rounded-xl font-bold text-sm shadow-lg"
            >
              Ver análisis completo en la app →
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#333] mt-8">
          <a href="/" className="hover:text-[#b8920a] transition-colors">Onze Picks</a>
          {' '}· Picks de fútbol con análisis IA
        </p>
      </div>
    </main>
  );
}
