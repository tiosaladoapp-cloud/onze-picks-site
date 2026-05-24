export function DownloadSection() {
  return (
    <section id="descargar" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#947403]/6 blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#b8920a] text-xs font-semibold" style={{ border: '1px solid rgba(148,116,3,0.3)', backgroundColor: 'rgba(148,116,3,0.08)' }}>
          🎁 Oferta de lanzamiento
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          Probá Elite gratis{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#947403] to-[#b8920a]">
            3 días
          </span>
          {' '}sin compromiso
        </h2>

        <p className="text-[#a0a0a0] max-w-md text-sm leading-relaxed">
          Oferta exclusiva para usuarios nuevos: activá Elite completo gratis los primeros 3 días.
          Cancelá cuando quieras — sin preguntas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* App Store */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm min-w-[180px] justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Descargar en iOS
          </a>

          {/* Google Play — próximamente */}
          <div
            className="flex items-center gap-3 px-7 py-4 rounded-2xl text-sm min-w-[180px] justify-center opacity-60 cursor-not-allowed"
            style={{ border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#a0a0a0' }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.18 23.76c.3.17.64.24.99.19L15.34 12 11.8 8.46 3.18 23.76zm17.49-10.9L17.6 11.2l-3.8 3.8 3.8 3.8 3.1-1.67c.88-.48.88-1.58-.03-2.07zM2.1.25C1.74.41 1.5.8 1.5 1.29v21.42c0 .49.24.88.6 1.04l11.5-11.5L2.1.25zm13.24 8.2L4.17.18c-.35-.2-.73-.2-1.04-.04l11.5 11.5 3.8-3.8-3.09-1.39z" />
            </svg>
            <span>
              Google Play
              <span className="block text-xs text-[#555555] font-normal">Próximamente</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-[#555555]">Compatible con iPhone (iOS 16+) · Android próximamente</p>
      </div>
    </section>
  );
}
