import Database from 'better-sqlite3';
const db = new Database('src/lib/server/database.sqlite');
console.log('--- AREAS ---');
console.log(JSON.stringify(db.prepare('SELECT id, name, slug FROM areas').all(), null, 2));
console.log('--- GUADALUPE LISTING ---');
console.log(JSON.stringify(db.prepare("SELECT id, slug, uuid FROM listings WHERE slug LIKE '%guadalupe%'").all(), null, 2));
