import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Soporte — Onze Picks',
  description: 'Centro de soporte de Onze Picks. Preguntas frecuentes y contacto directo. Respondemos en menos de 48 horas hábiles.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onzepicks.app/soporte' },
};

export default function SoportePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0]">
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12 pb-20">
          <div className="mb-10 flex items-center gap-3">
            <Link href="/" className="text-[#4ade80] text-sm font-semibold hover:underline">← Inicio</Link>
            <span className="text-[#333]">|</span>
            <Link href="/privacidad" className="text-[#4ade80] text-sm font-semibold hover:underline">Privacidad</Link>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Soporte</h1>
          <p className="text-[#555] text-sm mb-8">Respondemos en menos de 48 horas hábiles.</p>

          <div className="bg-[#141414] border border-[#222] rounded-xl p-6 text-center mb-10">
            <p className="text-[#888] text-sm mb-2">Contacto directo</p>
            <a
              href="mailto:onzepicks.app+soporte@gmail.com"
              className="text-[#4ade80] font-bold text-base hover:underline"
            >
              onzepicks.app+soporte@gmail.com
            </a>
          </div>

          <h2 className="text-white text-lg font-bold border-b border-[#222] pb-2 mb-6">Preguntas frecuentes</h2>

          <div className="space-y-6">
            <Faq question="¿Cuándo se publican los picks del día?">
              Los picks se publican automáticamente cada día a medianoche según la hora de tu dispositivo.
              Cuando empieza tu día, los picks ya están disponibles.
            </Faq>

            <Faq question="¿Qué incluye Scout Elite?">
              Con Elite desbloqueás picks ilimitados, cuotas en tiempo real en cada partido
              y análisis completo de cada predicción. Disponible por semana, mes o año.
              Cancelás cuando querés, sin penalidades.
            </Faq>

            <Faq question="¿Cómo cancelo mi suscripción Elite?">
              Las suscripciones se gestionan desde el App Store de Apple. Podés cancelar
              en <em>Configuración → Tu nombre → Suscripciones</em> en tu iPhone.
            </Faq>

            <Faq question="¿Cómo elimino mi cuenta?">
              Desde la app: <em>Perfil → Configuración → Eliminar cuenta</em>.
              Se eliminan todos tus datos de forma permanente e inmediata.
            </Faq>

            <Faq question="Encontré un bug o tengo una sugerencia">
              Escribinos a{' '}
              <a href="mailto:onzepicks.app+soporte@gmail.com" className="text-[#4ade80] hover:underline">
                onzepicks.app+soporte@gmail.com
              </a>{' '}
              con una descripción del problema y el modelo de tu iPhone. ¡Toda sugerencia es bienvenida!
            </Faq>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[#ccc] text-[15px] font-semibold mb-1">{question}</h3>
      <p className="text-[#aaa] text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}
