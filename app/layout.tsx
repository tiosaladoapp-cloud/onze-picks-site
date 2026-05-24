import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onzepicks-web.vercel.app';

export const metadata: Metadata = {
  title: 'Onze Picks — Picks de fútbol con análisis IA',
  description: 'Picks de fútbol seleccionados con inteligencia artificial. Análisis, estadísticas H2H y seguimiento de resultados en tiempo real. Descargá la app gratis.',
  keywords: ['picks fútbol', 'apuestas fútbol', 'predicciones fútbol', 'picks ia', 'onze picks', 'value bets'],
  openGraph: {
    title: 'Onze Picks — Picks de fútbol con análisis IA',
    description: 'Picks de fútbol seleccionados con inteligencia artificial.',
    url: SITE_URL,
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
  alternates: { canonical: SITE_URL },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Onze Picks',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'iOS, Android',
  description: 'Picks de fútbol seleccionados con inteligencia artificial. Análisis, estadísticas H2H y seguimiento de resultados en tiempo real.',
  url: SITE_URL,
  offers: [
    { '@type': 'Offer', price: '2.49', priceCurrency: 'USD', name: 'Elite Semanal' },
    { '@type': 'Offer', price: '6.99', priceCurrency: 'USD', name: 'Elite Mensual' },
    { '@type': 'Offer', price: '49.99', priceCurrency: 'USD', name: 'Elite Anual' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
