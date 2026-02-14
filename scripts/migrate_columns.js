import Database from 'better-sqlite3';
const db = new Database('src/lib/server/database.sqlite');
try {
    console.log('Adding bedrooms...');
    db.exec(`ALTER TABLE listings ADD COLUMN bedrooms INTEGER DEFAULT 0;`);
} catch (e) { console.log('Bedrooms might exist or error:', e.message); }

try {
    console.log('Adding bathrooms...');
    db.exec(`ALTER TABLE listings ADD COLUMN bathrooms REAL DEFAULT 0;`);
} catch (e) { console.log('Bathrooms might exist or error:', e.message); }

try {
    console.log('Adding parking...');
    db.exec(`ALTER TABLE listings ADD COLUMN parking INTEGER DEFAULT 0;`);
} catch (e) { console.log('Parking might exist or error:', e.message); }

try {
    console.log('Adding size...');
    db.exec(`ALTER TABLE listings ADD COLUMN size INTEGER DEFAULT 0;`);
} catch (e) { console.log('Size might exist or error:', e.message); }

try {
    console.log('Adding description...');
    db.exec(`ALTER TABLE listings ADD COLUMN description TEXT;`);
} catch (e) { console.log('Description might exist or error:', e.message); }

console.log('Migration attempts finished.');
