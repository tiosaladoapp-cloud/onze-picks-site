import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-14 text-center overflow-hidden">
      {/* Gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#947403]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-[#947403]/40 shadow-xl shadow-[#947403]/20">
          <Image src="/logo.png" alt="Onze Picks" width={80} height={80} className="object-cover" priority />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#947403]/40 bg-[#947403]/10 text-[#b8920a] text-xs font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#947403] animate-pulse" />
          PICKS DE FÚTBOL CON IA · GRATIS
        </span>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
          Apuesta con cabeza,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#947403] to-[#b8920a]">
            las estadísticas
          </span>
          {' '}a tu favor
        </h1>

        <p className="text-lg text-[#a0a0a0] max-w-xl leading-relaxed">
          IA que analiza estadísticas H2H, forma reciente y value bets antes de cada partido.
          Usada por más de 100 apostadores activos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="#descargar"
            className="btn-gold px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#947403]/30"
          >
            Descargar gratis →
          </a>
          <a
            href="#pick-del-dia"
            className="px-8 py-3.5 rounded-full border border-[#2a2a2a] hover:border-[#947403]/40 hover:bg-[#947403]/5 transition-colors font-semibold text-[#a0a0a0] text-sm"
          >
            Ver pick de hoy
          </a>
        </div>

        <p className="text-xs text-[#555555]">⚡ 3 días de Elite gratis para usuarios nuevos</p>
      </div>
    </section>
  );
}
