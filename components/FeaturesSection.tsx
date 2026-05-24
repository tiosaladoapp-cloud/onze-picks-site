const FEATURES = [
  { icon: '🧠', title: 'Análisis con IA', desc: 'Cada pick incluye análisis H2H, forma reciente y estadísticas comparadas generadas automáticamente.' },
  { icon: '📊', title: 'Tracker de apuestas', desc: 'Registrá tus apuestas reales, seguí tu P&L y exportá tu historial en CSV para análisis avanzado.' },
  { icon: '⚡', title: 'Value Bets automáticos', desc: 'Identificamos picks con ventaja estadística real. Solo cuotas con edge positivo.' },
  { icon: '🔔', title: 'Alertas de partido', desc: 'Recordatorio automático antes de cada partido para que nunca pierdas un pick.' },
  { icon: '🏆', title: 'Ranking de grupos', desc: 'Competí con amigos guardando picks. El ranking se actualiza con los resultados reales.' },
  { icon: '🌍', title: 'Mundial 2026', desc: 'Simulador de grupos, bracket interactivo y picks especiales para USA · CAN · MEX.' },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-3">Todo lo que necesitás para apostar mejor</h2>
          <p className="text-[#a0a0a0] max-w-lg mx-auto text-sm leading-relaxed">
            Onze Picks combina inteligencia artificial con análisis estadístico para darte los mejores picks del día.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="card-hover rounded-2xl bg-[#141414] p-5 flex flex-col gap-3">
              <span className="text-2xl">{icon}</span>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="text-xs text-[#a0a0a0] leading-5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
