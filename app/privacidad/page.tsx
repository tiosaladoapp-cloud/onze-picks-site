import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Onze Picks',
  description: 'Política de privacidad de Onze Picks. Conocé qué datos recopilamos, cómo los usamos y cómo podés ejercer tus derechos.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onzepicks.app/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0]">
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12 pb-20">
          <div className="mb-10 flex items-center gap-3">
            <Link href="/" className="text-[#4ade80] text-sm font-semibold hover:underline">← Inicio</Link>
            <span className="text-[#333]">|</span>
            <Link href="/soporte" className="text-[#4ade80] text-sm font-semibold hover:underline">Soporte</Link>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Política de Privacidad</h1>
          <p className="text-[#555] text-sm mb-10">Última actualización: mayo 2026 · Onze Picks</p>

          <p className="text-[#aaa] text-[15px] leading-relaxed mb-8">
            Onze Picks ("la app", "nosotros") respeta tu privacidad. Esta política describe
            qué datos recopilamos, cómo los usamos y cómo podés ejercer tus derechos.
          </p>

          <Section title="Datos que recopilamos">
            <ul className="list-disc pl-5 space-y-2 text-[#aaa] text-[15px]">
              <li><strong className="text-[#ccc]">Cuenta:</strong> dirección de correo electrónico y nombre de usuario al registrarte.</li>
              <li><strong className="text-[#ccc]">Picks guardados:</strong> los picks que marcás como favoritos, vinculados a tu cuenta.</li>
              <li><strong className="text-[#ccc]">Token de notificaciones:</strong> para enviarte alertas cuando tus picks se resuelvan (solo si lo permitís).</li>
              <li><strong className="text-[#ccc]">Datos de uso anónimos:</strong> errores técnicos registrados para mejorar la app (sin datos personales).</li>
            </ul>
          </Section>

          <Section title="Cómo usamos tus datos">
            <ul className="list-disc pl-5 space-y-2 text-[#aaa] text-[15px]">
              <li>Para identificarte y mostrarte tus picks guardados.</li>
              <li>Para enviarte notificaciones push (si las activaste).</li>
              <li>Para generar estadísticas de rendimiento en el leaderboard.</li>
            </ul>
          </Section>

          <Section title="Lo que NO hacemos">
            <ul className="list-disc pl-5 space-y-2 text-[#aaa] text-[15px]">
              <li>No vendemos tus datos a terceros.</li>
              <li>No hacemos tracking publicitario ni de comportamiento.</li>
              <li>No compartimos tu información con empresas de publicidad.</li>
            </ul>
          </Section>

          <Section title="Servicios de terceros">
            <ul className="list-disc pl-5 space-y-2 text-[#aaa] text-[15px]">
              <li><strong className="text-[#ccc]">Supabase</strong> — base de datos y autenticación (servidores en la UE/EE.UU.)</li>
              <li><strong className="text-[#ccc]">RevenueCat</strong> — gestión de suscripciones y compras in-app</li>
              <li><strong className="text-[#ccc]">Expo / Apple Push Notification Service</strong> — envío de notificaciones</li>
            </ul>
          </Section>

          <Section title="Retención y eliminación">
            <p className="text-[#aaa] text-[15px] leading-relaxed">
              Podés eliminar tu cuenta en cualquier momento desde{' '}
              <em>Perfil → Configuración → Eliminar cuenta</em>. Todos tus datos
              (picks guardados, historial, token de notificaciones) se borran de forma permanente.
            </p>
          </Section>

          <Section title="Menores de edad">
            <p className="text-[#aaa] text-[15px] leading-relaxed">
              La app no está dirigida a menores de 17 años. No recopilamos intencionalmente
              datos de menores.
            </p>
          </Section>

          <Section title="Cambios a esta política">
            <p className="text-[#aaa] text-[15px] leading-relaxed">
              Cualquier cambio relevante será notificado dentro de la app. La fecha de
              última actualización aparece al pie de esta página.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-white text-lg font-bold border-b border-[#222] pb-2 mb-4">{title}</h2>
      {children}
    </section>
  );
}
