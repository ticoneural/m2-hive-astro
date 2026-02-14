
// Diagnostic script using the project's own config
import { supabaseAdmin } from './src/lib/server/supabase.ts';

async function testConnection() {
    console.log('Testing Supabase Admin client...');
    const { data, error } = await supabaseAdmin.from('listings').select('id').limit(1);

    if (error) {
        console.error('Supabase connection error:', error.message);
    } else {
        console.log('Successfully connected to Supabase. Data:', data);
    }
}

testConnection();
