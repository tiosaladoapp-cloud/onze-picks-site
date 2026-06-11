'use client';

import { useState } from 'react';
import { joinWaitlist } from '@/app/actions/waitlist';

export function WaitlistForm() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const res = await joinWaitlist(email);
    if (res.ok) {
      setStatus('success');
    } else if (res.error === 'already_registered') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[#34c759]"
        style={{ border: '1px solid rgba(52,199,89,0.3)', backgroundColor: 'rgba(52,199,89,0.08)' }}>
        ✓ Listo — te avisamos cuando esté disponible.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-[#555] outline-none disabled:opacity-50"
        style={{ border: '1px solid #2a2a2a', backgroundColor: '#141414' }}
      />
      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="px-5 py-3 rounded-xl text-sm font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-opacity"
        style={{ backgroundColor: '#b8920a' }}
      >
        {status === 'loading' ? 'Guardando…' : 'Avisame'}
      </button>
      {status === 'duplicate' && (
        <p className="text-xs text-[#b8920a] mt-1 sm:col-span-2 w-full text-center">
          Ya estás en la lista — te avisamos cuando salga.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-[#ff3b30] mt-1 w-full text-center">
          Error al registrar. Intentá de nuevo.
        </p>
      )}
    </form>
  );
}
