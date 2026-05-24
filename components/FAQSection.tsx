'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Es gratis Onze Picks?',
    a: 'Sí. La app es gratis y tiene picks diarios sin costo. El plan Elite desbloquea análisis completo, value bets y picks premium. Podés probarlo 3 días gratis al registrarte.',
  },
  {
    q: '¿Cuántos picks hay por día?',
    a: 'Entre 3 y 6 picks diarios seleccionados por IA, cubriendo las principales ligas europeas y los 64 partidos del Mundial 2026. Los picks Elite incluyen análisis H2H completo.',
  },
  {
    q: '¿Cómo funcionan los grupos?',
    a: 'Creás un grupo privado, compartís el código con tus amigos y cada semana compiten guardando picks. El último en el ranking semanal debe cumplir el reto que eligió el grupo por votación.',
  },
  {
    q: '¿Los picks garantizan ganancias?',
    a: 'No. Ningún sistema puede garantizar ganancias en apuestas deportivas. Onze Picks es una herramienta de análisis estadístico para apostar con más información. Apostar siempre conlleva riesgos.',
  },
  {
    q: '¿Cuándo llega a Android?',
    a: 'La versión iOS ya está disponible. Android está en desarrollo y llegará próximamente. Podés dejar tu email para que te avisemos cuando esté lista.',
  },
  {
    q: '¿Puedo cancelar Elite cuando quiera?',
    a: 'Sí, cancelás desde la App Store en cualquier momento sin penalización. Si cancelás durante los 3 días gratis, no se te cobra nada.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-[#0d0d0d]" data-animate>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-3">Preguntas frecuentes</h2>
          <p className="text-[#a0a0a0] text-sm">Todo lo que necesitás saber antes de descargar.</p>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden transition-colors"
              style={{ borderColor: open === i ? 'rgba(148,116,3,0.35)' : '#2a2a2a', backgroundColor: '#141414' }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-bold text-white">{q}</span>
                <span
                  className="text-[#947403] text-lg font-black shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[#a0a0a0] leading-6">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
