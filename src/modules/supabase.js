import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Global Auth Listener for Invites and Password Resets
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/admin.html#reset-password';
    }
});
