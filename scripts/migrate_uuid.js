import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../src/lib/server/database.sqlite');

const db = new Database(dbPath);

console.log('--- MIGRATING: Adding UUID column ---');

try {
    // 1. Check if column exists
    const columns = db.prepare("PRAGMA table_info(listings)").all();
    const hasUuid = columns.some(c => c.name === 'uuid');

    if (hasUuid) {
        console.log('UUID column already exists. Skipping column addition.');
    } else {
        // 2. Add column
        console.log('Adding uuid column...');
        db.prepare("ALTER TABLE listings ADD COLUMN uuid TEXT").run();
        console.log('Column added.');
    }

    // 3. Populate empty UUIDs (and IDs if missing)
    const listings = db.prepare("SELECT rowid, id, slug FROM listings WHERE uuid IS NULL OR uuid = ''").all();

    if (listings.length > 0) {
        console.log(`Found ${listings.length} listings to update.`);

        // Use rowid for stable update reference if possible, or slug
        const updateStmt = db.prepare("UPDATE listings SET uuid = ?, id = COALESCE(id, ?) WHERE rowid = ?");

        const updateTx = db.transaction((items) => {
            for (const item of items) {
                const newUuid = randomUUID();
                // If id is null, we set it to the new UUID as well (or generate another one)
                // The query sets id = newUuid IF id was null.
                updateStmt.run(newUuid, newUuid, item.rowid);
                console.log(` - Updated listing slug: ${item.slug} -> UUID: ${newUuid}`);
            }
        });

        updateTx(listings);
        console.log('UUID/ID population complete.');
    } else {
        console.log('All listings already have UUIDs.');
    }

} catch (e) {
    console.error('Migration failed:', e);
}
