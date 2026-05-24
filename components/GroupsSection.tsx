const steps = [
  {
    num: '1',
    title: 'Creá o unite a un grupo',
    desc: 'Invitá amigos con un código único. Sin límite de participantes.',
  },
  {
    num: '2',
    title: 'Guardá picks antes del partido',
    desc: 'El sistema cierra los picks al inicio del partido. Nadie puede hacer trampa.',
  },
  {
    num: '3',
    title: 'Votá el reto del perdedor',
    desc: 'Cada lunes, el grupo vota cuál debería cumplir el último. El domingo se revela quién perdió.',
  },
];

const SAMPLE_CHALLENGES = [
  '🍺 El último invita las cervezas el próximo partido',
  '🕺 El último graba un TikTok bailando y lo sube a @onzepicks',
  '😬 El último le escribe a su ex diciéndole que la extraña',
  '💸 El último paga la próxima salida del grupo',
];

const RANKING = [
  { pos: 1, name: 'Carlos',  rate: '75%', icon: '🥇', color: '#b8920a', loser: false },
  { pos: 2, name: 'Martín',  rate: '67%', icon: '🥈', color: '#a0a0a0', loser: false },
  { pos: 3, name: 'Vos',     rate: '64%', icon: '🥉', color: '#b8920a', isYou: true, loser: false },
  { pos: 4, name: 'Diego',   rate: '60%', icon: '4',   color: '#555555', loser: false },
  { pos: 5, name: 'Santi',   rate: '55%', icon: '5',   color: '#555555', loser: false },
  { pos: 6, name: 'Fer',     rate: '50%', icon: '6',   color: '#555555', loser: false },
  { pos: 7, name: 'Tomás',   rate: '45%', icon: '7',   color: '#555555', loser: false },
  { pos: 8, name: 'Pablo',   rate: '33%', icon: '💀',  color: '#ef4444', loser: true },
];

export function GroupsSection() {
  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left — texto */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-[#947403]" />
              <span className="text-xs text-[#b8920a] font-bold tracking-wide uppercase">Solo en Onze Picks</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Competí con amigos.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#947403] to-[#b8920a]">
                El último paga el reto.
              </span>
            </h2>

            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              La mayoría de las apps son individuales y aburridas. Onze Picks tiene grupos privados donde cada semana
              el que quede <span className="text-white font-semibold">último en el ranking</span> debe cumplir
              el reto que eligió el grupo por votación.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-4">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm text-black btn-gold">
                    {num}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-0.5">{title}</p>
                    <p className="text-[#a0a0a0] text-xs leading-5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample challenges */}
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4 flex flex-col gap-2">
              <p className="text-xs text-[#555555] font-semibold mb-1 uppercase tracking-wide">Retos predefinidos</p>
              {SAMPLE_CHALLENGES.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#947403] shrink-0" />
                  <p className="text-xs text-[#a0a0a0]">{c}</p>
                </div>
              ))}
              <p className="text-xs text-[#555555] mt-1">+ podés proponer tu propio reto personalizado</p>
            </div>

            <a href="#descargar" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm w-fit">
              Crear mi grupo →
            </a>
          </div>

          {/* Right — mockup ranking + votación */}
          <div className="flex-1 w-full max-w-sm flex flex-col gap-3">

            {/* Ranking card */}
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid #2a2a2a', backgroundColor: '#141414' }}>
              <div className="px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(148,116,3,0.2)', border: '1px solid rgba(148,116,3,0.3)' }}>🏆</div>
                <div>
                  <p className="text-white text-xs font-bold">Los del Bar</p>
                  <p className="text-[#555555] text-xs">Semana del 19 al 25 de mayo</p>
                </div>
              </div>

              <div className="divide-y divide-[#1a1a1a]">
                {RANKING.map(({ pos, name, rate, icon, color, loser, isYou }) => (
                  <div key={pos} className={`flex items-center gap-3 px-4 py-3 ${loser ? 'bg-red-500/5' : isYou ? 'bg-[#947403]/5' : ''}`}>
                    <span className="text-sm w-5 text-center">{icon}</span>
                    <span className={`flex-1 text-sm font-semibold`} style={{ color: loser ? '#ef4444' : isYou ? '#b8920a' : '#fff' }}>
                      {name}
                      {isYou && <span className="text-xs text-[#947403] font-normal ml-1">(tú)</span>}
                      {loser && <span className="text-xs font-bold ml-1" style={{ color: '#ef4444' }}>ÚLTIMO</span>}
                    </span>
                    <span className="text-xs font-bold" style={{ color }}>{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voting card */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2a2a2a', backgroundColor: '#141414' }}>
              <div className="px-4 py-3 border-b border-[#2a2a2a] flex items-center justify-between">
                <p className="text-white text-xs font-bold">⚡ Reto de la semana</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: '#ff8f00', backgroundColor: 'rgba(255,143,0,0.12)', border: '1px solid rgba(255,143,0,0.3)' }}>VOTANDO</span>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                <p className="text-xs text-[#555555] mb-1">¿Cuál debería cumplir el perdedor?</p>
                {[
                  { label: '🍺 Invita las cervezas', pct: 60, winner: true },
                  { label: '🕺 TikTok bailando', pct: 30, winner: false },
                  { label: '😬 Escribe a su ex', pct: 10, winner: false },
                ].map(({ label, pct, winner }) => (
                  <div key={label} className={`rounded-lg px-3 py-2 border ${winner ? 'border-[#947403]/40 bg-[#947403]/8' : 'border-[#2a2a2a] bg-[#1a1a1a]'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-semibold ${winner ? 'text-[#b8920a]' : 'text-[#a0a0a0]'}`}>{label}</span>
                      <span className={`text-xs font-bold ${winner ? 'text-[#b8920a]' : 'text-[#555555]'}`}>{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[#2a2a2a] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: winner ? '#947403' : '#2a2a2a' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
