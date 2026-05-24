import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t py-8 px-4" style={{ borderColor: '#2a2a2a', backgroundColor: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#2a2a2a]">
            <Image src="/logo.png" alt="Onze Picks" width={28} height={28} className="object-cover" />
          </div>
          <span className="font-black text-white text-sm">Onze Picks</span>
          <span>·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-4">
          <a href="/privacidad" className="hover:text-[#a0a0a0] transition-colors">Privacidad</a>
          <a href="/terminos" className="hover:text-[#a0a0a0] transition-colors">Términos</a>
          <a href="mailto:tiosalado.app@gmail.com" className="hover:text-[#a0a0a0] transition-colors">Contacto</a>
        </div>
        <p className="text-center sm:text-right max-w-xs leading-relaxed">
          Las picks son con fines informativos. Apostar conlleva riesgos.
        </p>
      </div>
    </footer>
  );
}
