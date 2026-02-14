import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('src/lib/server/database.sqlite');
const db = new Database(dbPath);

const slug = 'apartamento-amueblado-ulacit-guadalupe';

const cover_path = '/assets/properties/guadalupe/1.jpg';
const gallery_paths = JSON.stringify([
    '/assets/properties/guadalupe/1.jpg',
    '/assets/properties/guadalupe/2.jpg',
    '/assets/properties/guadalupe/3.jpg',
    '/assets/properties/guadalupe/4.jpg',
    '/assets/properties/guadalupe/5.jpg'
]);

try {
    const stmt = db.prepare(`
        UPDATE listings 
        SET cover_path = ?, gallery_paths = ?
        WHERE slug = ?
    `);

    const info = stmt.run(cover_path, gallery_paths, slug);

    console.log(`Updated ${info.changes} row(s).`);

    // Verify
    const row = db.prepare('SELECT cover_path, gallery_paths FROM listings WHERE slug = ?').get(slug);
    console.log('New cover_path:', row.cover_path);
    console.log('New gallery_paths:', row.gallery_paths);

} catch (e) {
    console.error('Error updating DB:', e);
}
