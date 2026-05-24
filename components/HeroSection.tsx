export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6C63FF]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6C63FF]/40 bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
          PICKS DE FÚTBOL CON IA
        </span>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
          El pick del día,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#a78bfa]">
            analizado por IA
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
          Análisis H2H, estadísticas de forma y value bets identificados automáticamente.
          Seguí tu rendimiento y batí al mercado.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="#descargar"
            className="px-8 py-3.5 rounded-full bg-[#6C63FF] hover:bg-[#5b52e8] transition-colors font-bold text-white text-sm shadow-lg shadow-[#6C63FF]/30"
          >
            Descargar gratis →
          </a>
          <a
            href="#pick-del-dia"
            className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors font-semibold text-gray-300 text-sm"
          >
            Ver pick de hoy
          </a>
        </div>
      </div>
    </section>
  );
}
