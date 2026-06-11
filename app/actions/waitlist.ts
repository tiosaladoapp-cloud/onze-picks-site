'use server';

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  await resend.emails.send({
    from: 'Onze Picks <noreply@onzepicks.app>',
    to: email,
    subject: '¡Te avisamos cuando Onze Picks esté disponible!',
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#141414;border-radius:16px;border:1px solid #222;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #1e1e1e;">
            <div style="display:inline-block;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:10px 16px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">ONZE</span>
              <span style="font-size:20px;font-weight:900;color:#b8920a;letter-spacing:-0.5px;"> PICKS</span>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">
              ¡Estás en la lista! 🎯
            </h1>
            <p style="margin:0 0 20px;font-size:15px;color:#a0a0a0;line-height:1.6;">
              En cuanto Onze Picks esté disponible en el App Store, serás de los primeros en saberlo.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#a0a0a0;line-height:1.6;">
              Mientras tanto, visita la web para ver todo lo que tendrá la app.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:10px;background:#b8920a;">
                  <a href="https://onzepicks.app" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#000000;text-decoration:none;">
                    Ver onzepicks.app
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1e1e1e;text-align:center;">
            <p style="margin:0;font-size:12px;color:#444444;">
              Onze Picks · by OVS Studio<br>
              <a href="https://onzepicks.app" style="color:#555555;text-decoration:none;">onzepicks.app</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  return { ok: true };
}
