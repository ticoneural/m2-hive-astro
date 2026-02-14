import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Construct path relative to this script
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../src/lib/server/database.sqlite');

console.log(`Inspecting database at: ${dbPath}`);

try {
    const db = new Database(dbPath, { readonly: true });

    // Check listings schema
    const columns = db.prepare("PRAGMA table_info(listings)").all();
    console.log("Columns in 'listings' table:");
    columns.forEach(col => console.log(` - ${col.name} (${col.type})`));

} catch (err) {
    console.error("Error inspecting database:", err);
}
