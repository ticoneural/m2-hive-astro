
import { createClient } from '@supabase/supabase-js';
import pkg from 'better-sqlite3';
const Database = pkg;
import fs from 'fs';
import path from 'path';

// Manual env load
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length > 0) env[key.trim()] = val.join('=').trim();
});

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Using URL:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing raw fetch to Supabase URL...');
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/health`, {
            headers: { 'apikey': supabaseKey }
        });
        console.log('Fetch status:', res.status);
    } catch (e) {
        console.error('Fetch failed:', e.message);
    }

    console.log('Testing Supabase SDK client...');
    try {
        const { data, error } = await supabase.from('listings').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Supabase SDK error:', error.message);
        } else {
            console.log('Successfully connected to Supabase.');
        }
    } catch (e) {
        console.error('SDK caught error:', e.message);
    }
}

testConnection();
