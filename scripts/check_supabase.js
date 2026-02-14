import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSupabase() {
    console.log('--- CHECKING SUPABASE ---');

    const { data: areas, error: areasError } = await supabase.from('areas').select('count', { count: 'exact' });
    if (areasError) console.error('Error fetching areas count:', areasError.message);
    else console.log('Areas count:', areas[0]?.count || 0);

    const { data: listings, error: listingsError } = await supabase.from('listings').select('count', { count: 'exact' });
    if (listingsError) console.error('Error fetching listings count:', listingsError.message);
    else console.log('Listings count:', listings[0]?.count || 0);
}

checkSupabase();
