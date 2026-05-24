export function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f] py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-black text-white text-sm">Onze Picks</span>
          <span>·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-4">
          <a href="/privacidad" className="hover:text-gray-400 transition-colors">Privacidad</a>
          <a href="/terminos" className="hover:text-gray-400 transition-colors">Términos</a>
          <a href="mailto:tiosalado.app@gmail.com" className="hover:text-gray-400 transition-colors">Contacto</a>
        </div>
        <p className="text-center sm:text-right max-w-xs">
          Las picks son con fines informativos. Apostar conlleva riesgos.
        </p>
      </div>
    </footer>
  );
}
