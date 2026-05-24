import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'Onze Picks — Picks de fútbol con análisis IA',
  description: 'Picks de fútbol seleccionados con inteligencia artificial. Análisis, estadísticas H2H y seguimiento de resultados en tiempo real. Descargá la app gratis.',
  keywords: ['picks fútbol', 'apuestas fútbol', 'predicciones fútbol', 'picks ia', 'onze picks', 'value bets'],
  openGraph: {
    title: 'Onze Picks — Picks de fútbol con análisis IA',
    description: 'Picks de fútbol seleccionados con inteligencia artificial.',
    url: 'https://onzepicks.app',
    siteName: 'Onze Picks',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onze Picks — Picks de fútbol con análisis IA',
    description: 'Picks de fútbol seleccionados con inteligencia artificial.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onzepicks.app' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
