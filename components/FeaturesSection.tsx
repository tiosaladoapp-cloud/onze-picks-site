const FEATURES = [
  {
    icon: '🧠',
    title: 'Análisis con IA',
    desc: 'Cada pick incluye análisis H2H, forma reciente y estadísticas comparadas generadas automáticamente.',
  },
  {
    icon: '📊',
    title: 'Tracker de apuestas',
    desc: 'Registrá tus apuestas reales, seguí tu P&L y exportá tu historial en CSV para análisis avanzado.',
  },
  {
    icon: '⚡',
    title: 'Value Bets automáticos',
    desc: 'Identificamos picks con ventaja estadística real. Solo cuotas con edge positivo.',
  },
  {
    icon: '🔔',
    title: 'Alertas de partido',
    desc: 'Recordatorio automático antes de cada partido para que nunca pierdas un pick.',
  },
  {
    icon: '🏆',
    title: 'Ranking de grupos',
    desc: 'Competí con amigos guardando picks. El ranking se actualiza con los resultados reales.',
  },
  {
    icon: '🌍',
    title: 'Mundial 2026',
    desc: 'Simulador de grupos, bracket interactivo y picks especiales para USA · CAN · MEX.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-[#0d0d14]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Todo lo que necesitás para apostar mejor</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Onze Picks combina inteligencia artificial con análisis humano para darte los mejores picks del día.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-5 flex flex-col gap-3 hover:border-[#6C63FF]/30 transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="text-xs text-gray-400 leading-5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
