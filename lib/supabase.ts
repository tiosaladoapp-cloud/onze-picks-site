import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FeaturedPick {
  id: string;
  home_team: string;
  away_team: string;
  home_logo: string | null;
  away_logo: string | null;
  league_name: string;
  league_logo: string | null;
  prediction: string;
  odds: number;
  confidence: string;
  pick_type: string;
  match_date: string;
  analysis: string | null;
}

export interface TipsterStats {
  total: number;
  wins: number;
  losses: number;
  winRate: number;
  roi: number;
}

export async function getFeaturedPick(): Promise<FeaturedPick | null> {
  // Use a 48-hour window from 12h ago to avoid timezone mismatches between
  // the UTC server and users in different timezones (e.g. UTC-3 late at night)
  const from = new Date(Date.now() - 12 * 60 * 60 * 1000);
  const to   = new Date(Date.now() + 36 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('picks')
    .select('id, home_team, away_team, home_logo, away_logo, league_name, league_logo, prediction, odds, confidence, pick_type, match_date, analysis')
    .gte('match_date', from.toISOString())
    .lte('match_date', to.toISOString())
    .eq('is_premium', false)
    .is('result', null)
    .order('match_date', { ascending: true })
    .order('confidence', { ascending: false })
    .order('odds', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data as FeaturedPick;
}

export async function getTipsterStats(): Promise<TipsterStats> {
  const { data, error } = await supabase
    .from('picks')
    .select('result, odds')
    .in('result', ['win', 'loss']);

  if (error || !data) return { total: 0, wins: 0, losses: 0, winRate: 0, roi: 0 };

  const wins = data.filter((p) => p.result === 'win').length;
  const losses = data.filter((p) => p.result === 'loss').length;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const profit = data.reduce((acc, p) => {
    return acc + (p.result === 'win' ? (p.odds ?? 1) - 1 : -1);
  }, 0);
  const roi = total > 0 ? parseFloat(((profit / total) * 100).toFixed(1)) : 0;

  return { total, wins, losses, winRate, roi };
}
