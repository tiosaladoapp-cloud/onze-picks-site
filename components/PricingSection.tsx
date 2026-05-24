const PLANS = [
  {
    name: 'Semanal',
    price: '$2.49',
    period: '/semana',
    daily: '≈ $0.36/día',
    highlight: false,
    badge: null,
  },
  {
    name: 'Mensual',
    price: '$6.99',
    period: '/mes',
    daily: '≈ $0.23/día',
    highlight: false,
    badge: null,
  },
  {
    name: 'Anual',
    price: '$49.99',
    period: '/año',
    daily: '≈ $0.14/día',
    highlight: true,
    badge: 'Ahorrás 40%',
  },
];

const COMPARE_ROWS: { feature: string; free: string | null; elite: string | null }[] = [
  { feature: 'Picks por día',          free: '3',          elite: 'Ilimitados' },
  { feature: 'Análisis completo IA',   free: null,         elite: '✓' },
  { feature: 'Value bets',             free: null,         elite: '✓' },
  { feature: 'Odds en tiempo real',    free: null,         elite: '✓' },
  { feature: 'Estadísticas completas', free: null,         elite: '✓' },
  { feature: 'Todas las ligas y copas',free: null,         elite: '✓' },
  { feature: 'Picks del día siguiente',free: null,         elite: '✓ (de noche)' },
  { feature: 'Mundial 2026',           free: '4 picks',    elite: 'Completo' },
  { feature: 'H2H / patrones de equipo',free: null,        elite: '✓' },
  { feature: 'Grupos con retos semanales', free: null,     elite: '✓' },
];

export function PricingSection() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ border: '1px solid rgba(148,116,3,0.4)', backgroundColor: 'rgba(148,116,3,0.08)', color: '#b8920a' }}
          >
            💎 SALADO ELITE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Elegí tu plan.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#947403] to-[#b8920a]">
              Cancelás cuando quieras.
            </span>
          </h2>
          <p className="text-[#a0a0a0] text-sm max-w-md mx-auto">
            3 días de prueba gratis al registrarte. Sin sorpresas: cancelás desde la App Store antes de que termine y no se te cobra nada.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {PLANS.map(({ name, price, period, daily, highlight, badge }) => (
            <div
              key={name}
              className="rounded-2xl p-6 flex flex-col items-center text-center relative"
              style={{
                backgroundColor: highlight ? 'rgba(148,116,3,0.08)' : '#141414',
                border: highlight ? '1px solid rgba(148,116,3,0.5)' : '1px solid #2a2a2a',
              }}
            >
              {badge && (
                <span
                  className="absolute -top-3 text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#947403', color: '#000' }}
                >
                  {badge}
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: highlight ? '#b8920a' : '#555555' }}>
                {name}
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">{price}</span>
                <span className="text-sm text-[#555555] mb-1">{period}</span>
              </div>
              <p className="text-xs font-semibold" style={{ color: highlight ? '#b8920a' : '#555555' }}>
                {daily}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{ border: '1px solid #2a2a2a' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] px-5 py-3"
            style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#444' }}>Feature</span>
            <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#666' }}>Humilde</span>
            <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#b8920a' }}>Elite</span>
          </div>
          {/* Rows */}
          {COMPARE_ROWS.map(({ feature, free, elite }, i) => (
            <div
              key={feature}
              className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] px-5 py-3.5 items-center"
              style={{
                backgroundColor: i % 2 === 0 ? '#111111' : '#0e0e0e',
                borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid #1e1e1e' : 'none',
              }}
            >
              <span className="text-sm text-[#a0a0a0]">{feature}</span>
              <span className="text-sm text-center font-semibold" style={{ color: free ? '#a0a0a0' : '#ef4444' }}>
                {free ?? '✕'}
              </span>
              <span
                className="text-sm text-center font-semibold"
                style={{ color: elite === '✓' ? '#b8920a' : elite ? '#b8920a' : '#ef4444' }}
              >
                {elite ?? '✕'}
              </span>
            </div>
          ))}
        </div>

        {/* Free tier note */}
        <div className="text-center">
          <p className="text-xs text-[#555555] mb-4">
            También podés usar la app <span className="text-[#a0a0a0] font-semibold">gratis</span> con 3 picks diarios — sin tarjeta, sin límite de tiempo.
          </p>
          <a
            href="#descargar"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm shadow-lg"
          >
            Empezar gratis · 3 días Elite incluidos →
          </a>
        </div>
      </div>
    </section>
  );
}
