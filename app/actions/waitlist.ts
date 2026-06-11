'use server';

import { supabase } from '@/lib/supabase';

export async function joinWaitlist(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email inválido.' };
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'already_registered' };
    return { ok: false, error: 'Error al registrar. Intentá de nuevo.' };
  }

  return { ok: true };
}
