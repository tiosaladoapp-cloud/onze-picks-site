import Image from 'next/image';

const FEATURES = [
  { icon: '⚽', title: '64 partidos cubiertos', desc: 'Pick del día para cada partido del Mundial, desde la fase de grupos hasta la final.' },
  { icon: '🗺️', title: 'Simulador de grupos', desc: 'Predice los clasificados de los 12 grupos A–L y arma tu propio bracket.' },
  { icon: '🏆', title: 'Pick del campeón', desc: 'Elige tu selección favorita y sigue su camino hasta la final.' },
  { icon: '👥', title: 'Grupos temáticos', desc: 'Compite con amigos con picks exclusivos del Mundial. El último cumple el reto.' },
];

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export function MundialSection() {
  return (
    <section className="py-16 px-4 relative overflow-hidden" data-animate style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, #c8102e 0%, #006847 50%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Image src="/wc2026.png" alt="FIFA World Cup 2026" width={80} height={80} className="object-contain" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ border: '1px solid rgba(200,16,46,0.4)', backgroundColor: 'rgba(200,16,46,0.08)', color: '#e03050' }}>
            🌍 USA · CANADÁ · MÉXICO · 2026
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            El Mundial más grande{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8102e] via-[#947403] to-[#006847]">
              de la historia
            </span>
          </h2>
          <p className="text-[#a0a0a0] max-w-lg text-sm leading-relaxed">
            48 selecciones, 12 grupos, 64 partidos. Onze Picks cubre el Mundial completo
            con análisis IA, simulador de grupos y picks especiales para cada match.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="card-hover rounded-2xl bg-[#141414] p-5 flex flex-col gap-3">
              <span className="text-2xl">{icon}</span>
              <p className="text-white font-bold text-sm">{title}</p>
              <p className="text-[#a0a0a0] text-xs leading-5">{desc}</p>
            </div>
          ))}
        </div>

        {/* Groups display */}
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6">
          <p className="text-xs text-[#555555] font-bold uppercase tracking-widest text-center mb-4">12 Grupos · 48 Selecciones</p>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {GROUPS.map((g) => (
              <div key={g} className="aspect-square rounded-xl flex items-center justify-center font-black text-sm transition-colors"
                style={{ backgroundColor: 'rgba(148,116,3,0.1)', border: '1px solid rgba(148,116,3,0.2)', color: '#b8920a' }}>
                {g}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#555555] text-center mt-4">
            Picks disponibles desde el 11 de junio de 2026
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <a href="#descargar" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm shadow-lg">
            Seguir el Mundial con Onze Picks →
          </a>
        </div>
      </div>
    </section>
  );
}
