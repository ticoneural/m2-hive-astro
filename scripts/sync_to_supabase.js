
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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
    console.log('--- STARTING SYNC: SQLite -> Supabase ---');

    const db = new Database('database.sqlite');

    // 1. Sync AREAS (Exclude ID to let Supabase generate it or use it if allowed)
    const areas = db.prepare('SELECT * FROM areas').all();
    console.log(`Syncing ${areas.length} areas...`);

    const processedAreas = areas.map(({ id, ...rest }) => rest);

    const { data: syncedAreas, error: areasError } = await supabase.from('areas').insert(processedAreas).select();
    if (areasError) {
        console.error('Error syncing areas:', areasError.message);
    } else {
        console.log('✅ Areas synced.');
    }

    // Map old area IDs to new area IDs
    const areaMapping = {};
    if (syncedAreas) {
        areas.forEach((oldArea, index) => {
            areaMapping[oldArea.id] = syncedAreas[index].id;
        });
    }

    // 2. Sync LISTINGS
    const listings = db.prepare('SELECT * FROM listings').all();
    console.log(`Syncing ${listings.length} listings...`);

    const processedListings = listings.map(l => {
        const { id, area_id, ...rest } = l;
        try {
            if (rest.gallery_paths) rest.gallery_paths = JSON.parse(rest.gallery_paths);
        } catch (e) { }

        return {
            ...rest,
            area_id: areaMapping[area_id] || null
        };
    });

    const { error: listingsError } = await supabase.from('listings').insert(processedListings);
    if (listingsError) {
        console.error('Error syncing listings:', listingsError.message);
    } else {
        console.log('✅ Listings synced.');
    }
}

sync();
