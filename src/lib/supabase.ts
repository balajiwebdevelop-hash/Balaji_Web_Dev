import { createClient } from '@supabase/supabase-js';

export const DEFAULT_SUPABASE_URL = 'https://yvureduruttjoxhwuqwx.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXJlZHVydXR0am94aHd1cXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODA3NjgsImV4cCI6MjEwMjU1Njc2OH0.knhQk_Cc6Z3NF4iPGkgQU_B5LvR1l69cJmpelFkc0Xw';
export const DEFAULT_SUPABASE_SERVICE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXJlZHVydXR0am94aHd1cXd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njk4MDc2OCwiZXhwIjoyMTAyNTU2NzY4fQ.sHAE78IUF3wgmxDaj3OTWWOPB1Qhlth2FCzgAQdsqzU';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_SERVICE_KEY;
  return createClient(supabaseUrl, serviceKey);
}
